import { APIRequestContext } from '@playwright/test';

export interface EmailData {
  username?: string;
  temporaryPassword?: string;
  otp?: string;
  resetPasswordLink?: string;
}

export class MailHogHelper {
  private readonly baseUrl: string;
  private readonly api: string;
  private readonly request: APIRequestContext;

  // Các biến private readonly cho subject email (tiếng Nhật)
  private readonly _SUBJECT_ACC_ACTI_NOTIFICATION = 'アカウントを有効化のお知らせ';
  private readonly _SUBJECT_SECURE_LOGIN_VERIFI_CODE = '安全なログインの確認コードのお知らせ';
  private readonly _SUBJECT_ACC_ACTIVE_NEW_PW_SETUP = 'アカウント有効化および新しいパスワード設定のご案内';
  private readonly _SUBJECT_RESET_PASSWORD = 'パスワードリセットリクエスト';

  // Các label thường gặp trong body email (cũng có thể tách ra nếu cần)
  private readonly _LABEL_USERNAME = 'ユーザー名';
  private readonly _LABEL_TEMP_PASSWORD = '仮パスワード';
  private readonly _LABEL_OTP_FULL = 'ワンタイムパスコード（OTP）';
  private readonly _LABEL_OTP_SHORT = 'ワンタイムパスコード';
  private readonly _LABEL_OTP_ENGLISH = 'OTP';
  private readonly _LABEL_RESET_PASSWORD = 'パスワードをリセット';

  private _email: any;
  private _emailAddress?: string;

  constructor(request: APIRequestContext, baseUrl: string = 'http://35.74.242.225:8025') {
    this.baseUrl = baseUrl;
    this.api = `${baseUrl}/api`;
    this.request = request;
  }

  private normalizeForCompare(str: string): string {
    if (!str) return '';
    // Bỏ hết whitespace, giữ nguyên ký tự
    return str.replace(/\s+/g, '').trim();
  }

  /**
   * Decode RFC 2047 encoded email subject (UTF-8)
   */
  private decodeSubject(encoded: string): string {
    if (!encoded || !encoded.includes('=?')) {
      return encoded;
    }

    return encoded.replace(/=\?UTF-8\?q\?([^?]+)\?=/g, (match, text) => {
      const bytes: number[] = [];
      text = text.replace(/_/g, ' ');

      let i = 0;
      while (i < text.length) {
        if (text[i] === '=' && i + 2 < text.length) {
          bytes.push(parseInt(text.substr(i + 1, 2), 16));
          i += 3;
        } else {
          bytes.push(text.charCodeAt(i));
          i++;
        }
      }

      const uint8Array = new Uint8Array(bytes);
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(uint8Array);
    });
  }

  private decodeBody(body?: any) {
    let cleaned = body.replace(/=\r?\n/g, '');
    const bytes = []; let i = 0;
    while (i < cleaned.length) {
      if (cleaned[i] === '=' && i + 2 < cleaned.length) {
        const hex = cleaned.substr(i + 1, 2);
        if (/^[0-9A-F]{2}$/i.test(hex)) { bytes.push(parseInt(hex, 16)); i += 3; }
        else { bytes.push(cleaned.charCodeAt(i)); i++; }
      }
      else { bytes.push(cleaned.charCodeAt(i)); i++; }
    }
    const uint8Array = new Uint8Array(bytes);
    let decoded = new TextDecoder('utf-8').decode(uint8Array);
    decoded = decoded.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
    return decoded;
  }

  private decodeHtmlEntities(text: string): string {
    return text
      .replace(/&#43;/g, '+')
      .replace(/&#(\d+);/g, (m, dec) => String.fromCharCode(parseInt(dec)))
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  private stripHtmlTags(html: string): string {
    return html.replace(/<[^>]+>/g, '').trim();
  }

  private async searchEmail(emailAddress: string, subjectContains?: string): Promise<any | null> {
    const response = await this.request.get(
      `${this.api}/v2/search?kind=to&query=${emailAddress}&limit=10`
    );

    if (!response.ok()) {
      throw new Error(`Failed to search emails: ${response.status()}`);
    }

    const data = await response.json();

    // console.log("emailAddress: ", emailAddress);
    // console.log("subjectContains: ", subjectContains);
    // console.log("Data: ", data);

    if (!data.items || data.items.length === 0) {
      return null;
    }

    // If subject filter provided, find matching email
    if (subjectContains) {
      for (const email of data.items) {
        const decodedSubject = this.decodeSubject(email.Content.Headers.Subject[0]);
        // console.log("decodedSubject: ", decodedSubject);
        if (this.normalizeForCompare(decodedSubject).includes(this.normalizeForCompare(subjectContains))) {
          return email;
        }
      }
      return null;
    }

    // Return latest email
    return data.items[0];
  }

  /**
   * Extract text value after a Japanese label in email body
   */
  private extractValueAfterLabel(body: string, label: string): string | null {
    // console.log("Body: ", body)
    // Pattern 1: Inside <div class="cred-display">
    const divPattern = new RegExp(`${label}[^<]*<div class="cred-display">([^<]+)</div>`, 'i');
    const divMatch = body.match(divPattern);
    if (divMatch) return divMatch[1].trim();

    // Pattern 2: After label with colon/space
    const colonPattern = new RegExp(`${label}[:\\s：]+([A-Za-z0-9@._+-]+)`, 'i');
    const colonMatch = body.match(colonPattern);
    if (colonMatch) return colonMatch[1].trim();

    // Pattern 3: In table row
    const tablePattern = new RegExp(
      `<td[^>]*>${label}</td>\\s*<td[^>]*>([^<]+)</td>`,
      'i'
    );
    const tableMatch = body.match(tablePattern);
    if (tableMatch) return tableMatch[1].trim();

    return null;
  }

  private extractValue(body: any, label: string): string | null {
    // Find label position
    const patterns = [
      new RegExp(`<span[^>]*class="field-label"[^>]*>${label}</span>`, 'i'),
      new RegExp(`<label[^>]*>${label}</label>`, 'i'),
      new RegExp(`<span[^>]*>${label}</span>`, 'i'),
      new RegExp(label, 'i')
    ];

    let labelIndex = -1;
    for (const pattern of patterns) {
      const match = pattern.exec(body);
      if (match) {
        labelIndex = match.index;
        break;
      }
    }

    if (labelIndex === -1) return null;

    // IMPORTANT: Search only next 500 chars!
    const searchArea = body.substring(labelIndex, labelIndex + 500);
    const credMatch = searchArea.match(/<div class="cred-display"[^>]*>([\s\S]*?)<\/div>/i);

    if (credMatch) {
      return this.decodeHtmlEntities(this.stripHtmlTags(credMatch[1]));
    }

    return null;
  }

  /**
   * Extract link after Japanese text
   */
  private extractLinkAfterText(body: string, text: string): string | null {
    // Pattern 1: Link in same line
    const pattern1 = new RegExp(`${text}[^<]*<a[^>]+href=["']([^"']+)["']`, 'i');
    const match1 = body.match(pattern1);
    if (match1) return match1[1].trim();

    // Pattern 2: Link nearby (within 200 chars)
    const index = body.indexOf(text);
    if (index !== -1) {
      const nearby = body.substring(index, index + 200);
      const linkMatch = nearby.match(/<a[^>]+href=["']([^"']+)["']/);
      if (linkMatch) return linkMatch[1].trim();
    }

    // Pattern 3: Any link containing "reset" or "password"
    if (text.includes('パスワード') || text.includes('リセット')) {
      const resetLinks = body.match(/<a[^>]+href=["']([^"']*(?:reset|password)[^"']*)["']/gi);
      if (resetLinks && resetLinks.length > 0) {
        const hrefMatch = resetLinks[0].match(/href=["']([^"']+)["']/);
        if (hrefMatch) return hrefMatch[1];
      }
    }

    return null;
  }

  /**
   * Check if new mail exists for email address
   * @param emailAddress - Recipient email address
   * @returns true if email exists, false otherwise
   */
  async haveNewMail(emailAddress: string): Promise<boolean> {
    const email = await this.searchEmail(emailAddress);
    return email !== null;
  }

  /**
   * Check for Account Activation Notification email
   * Subject: アカウントを有効化のお知らせ
   * @param emailAddress - Recipient email address
   * @returns Object with username and temporaryPassword, or null if not found
   */
  async getInfoNewMail_AccountActivate(emailAddress?: string): Promise<EmailData | null> {
    const email = await this._email;

    if (!email) {
      return null;
    }

    const body = this.decodeBody(email.Content.Body);

    const username = this.extractValue(body, this._LABEL_USERNAME);
    const temporaryPassword = this.extractValue(body, this._LABEL_TEMP_PASSWORD);

    return {
      username: username || undefined,
      temporaryPassword: temporaryPassword || undefined
    };
  }

  /**
   * Check for Secure Login Verification Code email
   * Subject: 安全なログインの確認コードのお知らせ
   * @param emailAddress - Recipient email address
   * @returns Object with otp, or null if not found
   */
  async getInfoNewMail_OTP(emailAddress?: string): Promise<EmailData | null> {
    const email = await this._email;

    if (!email) {
      return null;
    }

    const body = email.Content.Body;

    // Extract OTP - look for ワンタイムパスコード（OTP）
    let otp = this.extractValueAfterLabel(body, this._LABEL_OTP_FULL);

    if (!otp) {
      otp = this.extractValueAfterLabel(body, this._LABEL_OTP_SHORT);
    }

    if (!otp) {
      otp = this.extractValueAfterLabel(body, this._LABEL_OTP_ENGLISH);
    }

    // Sometimes OTP is just a 6-digit number
    if (!otp) {
      const otpMatch = body.match(/\b(\d{6})\b/);
      if (otpMatch) {
        otp = otpMatch[1];
      }
    }

    return {
      otp: otp || undefined
    };
  }

  /**
   * Check for Account Activation and New Password Setup Instructions email
   * Subject: アカウント有効化および新しいパスワード設定のご案内
   * @param emailAddress - Recipient email address
   * @returns Object with username and temporaryPassword, or null if not found
   */
  async getInfoNewMail_RegisterUser(emailAddress?: string): Promise<EmailData | null> {
    const email = await this._email;

    if (!email) {
      return null;
    }

    const body = this.decodeBody(email.Content.Body);

    const usernameMatch = body.match(new RegExp(`<span[^>]*>${this._LABEL_USERNAME}<\\/span>[\\s\\S]*?<div class="cred-display">([^<]+)<\\/div>`, 'i'));
    const username = usernameMatch ? this.decodeHtmlEntities(this.stripHtmlTags(usernameMatch[1].trim())) : null;

    const temporaryPasswordMatch = body.match(new RegExp(`<span[^>]*>${this._LABEL_TEMP_PASSWORD}<\\/span>[\\s\\S]*?<div class="cred-display">([^<]+)<\\/div>`, 'i'));
    const temporaryPassword = temporaryPasswordMatch ? this.decodeHtmlEntities(this.stripHtmlTags(temporaryPasswordMatch[1].trim())) : null;

    // console.log("username: ", username);
    // console.log("temporaryPassword: ", temporaryPassword);

    return {
      username: username || undefined,
      temporaryPassword: temporaryPassword || undefined
    };
  }

  /**
   * Check for Password Reset Request email
   * Subject: パスワードリセットリクエスト
   * @param emailAddress - Recipient email address
   * @returns Object with resetPasswordLink, or null if not found
   */
  async getInfoNewMail_ResetPassword(emailAddress?: string): Promise<EmailData | null> {
    const email = await this._email;

    if (!email) {
      return null;
    }

    const body = this.decodeBody(email.Content.Body);

    // Extract reset password link
    const resetPasswordLink = this.extractLinkAfterText(body, this._LABEL_RESET_PASSWORD);

    return {
      resetPasswordLink: resetPasswordLink || undefined
    };
  }

  /**
   * Delete all emails in MailHog
   */
  async deleteAllEmails(): Promise<void> {
    await this.request.delete(`${this.api}/v1/messages`);
  }

  /**
   * Get all emails for debugging
   */
  async getAllEmails(limit: number = 10): Promise<any[]> {
    const response = await this.request.get(`${this.api}/v2/messages?limit=${limit}`);
    const data = await response.json();

    return data.items.map((email: any) => ({
      from: `${email.From.Mailbox}@${email.From.Domain}`,
      to: `${email.To[0].Mailbox}@${email.To[0].Domain}`,
      subject: this.decodeSubject(email.Content.Headers.Subject[0]),
      created: new Date(email.Created).toLocaleString(),
      id: email.ID
    }));
  }

  /**
   * Wait for email to arrive (polling)
   * @param emailAddress - Recipient email address
   * @param subjectContains - Optional subject filter
   * @param timeoutSeconds - Max wait time in seconds (default: 30)
   * @returns true if email arrived, false if timeout
   */
  async waitForEmail(
    emailAddress: string,
    subjectContains?: string,
    timeoutSeconds: number = 30
  ): Promise<boolean> {
    const startTime = Date.now();

    while ((Date.now() - startTime) / 1000 < timeoutSeconds) {
      const email = await this.searchEmail(emailAddress, subjectContains);

      // console.log("Email: ", email);

      if (email) {
        this._emailAddress = emailAddress;
        this._email = email;
        return true;
      }

      // Wait 1 second before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return false;
  }

  async waitForEmail_AccountActivate(
    emailAddress: string,
  ): Promise<boolean> {
    return await this.waitForEmail(emailAddress, this._SUBJECT_ACC_ACTI_NOTIFICATION);
  }

  async waitForEmail_OTP(
    emailAddress: string,
  ): Promise<boolean> {
    // console.log("SUBJECT_SECURE_LOGIN_VERIFI_CODE: ", this._SUBJECT_SECURE_LOGIN_VERIFI_CODE)
    return await this.waitForEmail(emailAddress, this._SUBJECT_SECURE_LOGIN_VERIFI_CODE);
  }

  async waitForEmail_RegisterUser(
    emailAddress: string,
  ): Promise<boolean> {
    return await this.waitForEmail(emailAddress, this._SUBJECT_ACC_ACTIVE_NEW_PW_SETUP);
  }

  async waitForEmail_ResetPassword(
    emailAddress: string,
  ): Promise<boolean> {
    return await this.waitForEmail(emailAddress, this._SUBJECT_RESET_PASSWORD);
  }
}