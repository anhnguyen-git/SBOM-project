"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailHogHelper = void 0;
class MailHogHelper {
    constructor(request, baseUrl = 'http://35.74.242.225:8025') {
        this.baseUrl = baseUrl;
        this.api = `${baseUrl}/api`;
        this.request = request;
    }
    /**
     * Decode RFC 2047 encoded email subject (UTF-8)
     */
    decodeSubject(encoded) {
        if (!encoded || !encoded.includes('=?')) {
            return encoded;
        }
        return encoded.replace(/=\?UTF-8\?q\?([^?]+)\?=/g, (match, text) => {
            const bytes = [];
            text = text.replace(/_/g, ' ');
            let i = 0;
            while (i < text.length) {
                if (text[i] === '=' && i + 2 < text.length) {
                    bytes.push(parseInt(text.substr(i + 1, 2), 16));
                    i += 3;
                }
                else {
                    bytes.push(text.charCodeAt(i));
                    i++;
                }
            }
            const uint8Array = new Uint8Array(bytes);
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(uint8Array);
        });
    }
    /**
     * Search for email by recipient
     */
    async searchEmail(emailAddress, subjectContains) {
        const response = await this.request.get(`${this.api}/v2/search?kind=to&query=${emailAddress}&limit=50`);
        if (!response.ok()) {
            throw new Error(`Failed to search emails: ${response.status()}`);
        }
        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            return null;
        }
        // If subject filter provided, find matching email
        if (subjectContains) {
            for (const email of data.items) {
                const decodedSubject = this.decodeSubject(email.Content.Headers.Subject[0]);
                if (decodedSubject.includes(subjectContains)) {
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
    extractValueAfterLabel(body, label) {
        // Pattern 1: Inside <div class="cred-display">
        const divPattern = new RegExp(`${label}[^<]*<div class="cred-display">([^<]+)</div>`, 'i');
        const divMatch = body.match(divPattern);
        if (divMatch)
            return divMatch[1].trim();
        // Pattern 2: After label with colon/space
        const colonPattern = new RegExp(`${label}[:\\s：]+([A-Za-z0-9@._+-]+)`, 'i');
        const colonMatch = body.match(colonPattern);
        if (colonMatch)
            return colonMatch[1].trim();
        // Pattern 3: In table row
        const tablePattern = new RegExp(`<td[^>]*>${label}</td>\\s*<td[^>]*>([^<]+)</td>`, 'i');
        const tableMatch = body.match(tablePattern);
        if (tableMatch)
            return tableMatch[1].trim();
        return null;
    }
    /**
     * Extract link after Japanese text
     */
    extractLinkAfterText(body, text) {
        // Pattern 1: Link in same line
        const pattern1 = new RegExp(`${text}[^<]*<a[^>]+href=["']([^"']+)["']`, 'i');
        const match1 = body.match(pattern1);
        if (match1)
            return match1[1].trim();
        // Pattern 2: Link nearby (within 200 chars)
        const index = body.indexOf(text);
        if (index !== -1) {
            const nearby = body.substring(index, index + 200);
            const linkMatch = nearby.match(/<a[^>]+href=["']([^"']+)["']/);
            if (linkMatch)
                return linkMatch[1].trim();
        }
        // Pattern 3: Any link containing "reset" or "password"
        if (text.includes('パスワード') || text.includes('リセット')) {
            const resetLinks = body.match(/<a[^>]+href=["']([^"']*(?:reset|password)[^"']*)["']/gi);
            if (resetLinks && resetLinks.length > 0) {
                const hrefMatch = resetLinks[0].match(/href=["']([^"']+)["']/);
                if (hrefMatch)
                    return hrefMatch[1];
            }
        }
        return null;
    }
    /**
     * Check if new mail exists for email address
     * @param emailAddress - Recipient email address
     * @returns true if email exists, false otherwise
     */
    async haveNewMail(emailAddress) {
        const email = await this.searchEmail(emailAddress);
        return email !== null;
    }
    /**
     * Check for Account Activation Notification email
     * Subject: アカウントを有効化のお知らせ
     * @param emailAddress - Recipient email address
     * @returns Object with username and temporaryPassword, or null if not found
     */
    async haveNewMail_AccActiNotification(emailAddress) {
        const email = await this.searchEmail(emailAddress, 'アカウントを有効化のお知らせ');
        if (!email) {
            return null;
        }
        const body = email.Content.Body;
        const username = this.extractValueAfterLabel(body, 'ユーザー名');
        const temporaryPassword = this.extractValueAfterLabel(body, '仮パスワード');
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
    async haveNewMail_SecureLoginVerifiCode(emailAddress) {
        const email = await this.searchEmail(emailAddress, '安全なログインの確認コードのお知らせ');
        if (!email) {
            return null;
        }
        const body = email.Content.Body;
        // Extract OTP - look for ワンタイムパスコード（OTP）
        let otp = this.extractValueAfterLabel(body, 'ワンタイムパスコード（OTP）');
        if (!otp) {
            otp = this.extractValueAfterLabel(body, 'ワンタイムパスコード');
        }
        if (!otp) {
            otp = this.extractValueAfterLabel(body, 'OTP');
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
    async haveNewMail_AccActive_NewPwSetupInstructions(emailAddress) {
        const email = await this.searchEmail(emailAddress, 'アカウント有効化および新しいパスワード設定のご案内');
        if (!email) {
            return null;
        }
        const body = email.Content.Body;
        const username = this.extractValueAfterLabel(body, 'ユーザー名');
        const temporaryPassword = this.extractValueAfterLabel(body, '仮パスワード');
        return {
            username: username || undefined,
            temporaryPassword: temporaryPassword || undefined
        };
    }
    /**
     * Check for Assigned as New Project Owner email
     * Subject: プロジェクトの新しいオーナーに任命されました
     * @param emailAddress - Recipient email address
     * @returns Object with resetPasswordLink, or null if not found
     */
    async haveNewMail_assignedNewProjectOwner(emailAddress) {
        const email = await this.searchEmail(emailAddress, 'プロジェクトの新しいオーナーに任命されました');
        if (!email) {
            return null;
        }
        const body = email.Content.Body;
        // Extract reset password link
        const resetPasswordLink = this.extractLinkAfterText(body, 'パスワードをリセット');
        return {
            resetPasswordLink: resetPasswordLink || undefined
        };
    }
    /**
     * Delete all emails in MailHog
     */
    async deleteAllEmails() {
        await this.request.delete(`${this.api}/v1/messages`);
    }
    /**
     * Get all emails for debugging
     */
    async getAllEmails(limit = 10) {
        const response = await this.request.get(`${this.api}/v2/messages?limit=${limit}`);
        const data = await response.json();
        return data.items.map((email) => ({
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
    async waitForEmail(emailAddress, subjectContains, timeoutSeconds = 30) {
        const startTime = Date.now();
        while ((Date.now() - startTime) / 1000 < timeoutSeconds) {
            const email = await this.searchEmail(emailAddress, subjectContains);
            if (email) {
                return true;
            }
            // Wait 1 second before checking again
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        return false;
    }
}
exports.MailHogHelper = MailHogHelper;
