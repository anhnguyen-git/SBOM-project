import { test, expect } from '@playwright/test';
import { MailHogHelper } from '../helpers/MailHelper'; // Điều chỉnh path theo project của bạn
import { generateUniqueUsername } from '../helpers/utils';
// Nhóm test cho MailHogHelper
test.describe('MailHog Helper - Email Extraction & Waiting', () => {

    // Setup trước toàn bộ suite
    // test.beforeAll(async ({ request }) => {


    // Xóa hết email cũ để test sạch
    // await mailHog.deleteAllEmails();
    // console.log('Before All: Đã xóa toàn bộ email trong MailHog');
    // });

    // Cleanup sau mỗi test (chụp ảnh nếu fail)
    // test.afterEach(async ({ page }, testInfo) => {
    //     if (testInfo.status === 'failed') {
    //         await page.screenshot({
    //             path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}-failed.png`,
    //             fullPage: true,
    //         });
    //     }
    // });

    // Cleanup cuối suite
    // test.afterAll(async () => {
    //     await mailHog.deleteAllEmails();
    //     console.log('After All: Đã xóa email sau khi test xong');
    // });

    // Test 1: Kiểm tra deleteAllEmails và getAllEmails
    test('test', async ({ request }) => {
        const mailHog = new MailHogHelper(request);
        // await mailHog.deleteAllEmails();
        // const emails = await mailHog.getAllEmails(10);
        // expect(emails).toHaveLength(0);
        // console.log('Current Emails Length: ', emails.length);
        // await mailHog.waitForEmail_OTP("thanhthoai_1234@gmail.com");
        // const OTP = await mailHog.getInfoNewMail_OTP();
        // console.log("OTP: ", OTP);
        // await mailHog.waitForEmail_RegisterUser("thanhthoai_1234222@gmail.com");
        // const emailData = await mailHog.getInfoNewMail_RegisterUser();
        // console.log("username: ", emailData?.username);
        // console.log("tempPassword: ", emailData?.temporaryPassword);
        // await mailHog.waitForEmail_AccountActivate("user12233@gmail.com");
        // const emailData2 = await mailHog.getInfoNewMail_AccountActivate();
        // console.log("username: ", emailData2?.username);
        // console.log("tempPassword: ", emailData2?.temporaryPassword);
        // await mailHog.waitForEmail_ResetPassword("user12233@gmail.com");
        // const resetLink = await mailHog.getInfoNewMail_ResetPassword();
        // console.log("Reset Link: ", resetLink);
        const username = generateUniqueUsername("thanhthoai");
        console.log("username: ", username);
    });
});