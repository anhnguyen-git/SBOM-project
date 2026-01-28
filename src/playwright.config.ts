import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    // Timeout cho mỗi test
    timeout: 60 * 1000,

    expect: {
        timeout: 10 * 1000,
    },

    // Chạy song song
    fullyParallel: false,

    // Reporter
    reporter: [
        ['list'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ],

    // Folder chứa screenshot, video, trace
    outputDir: 'test-results',

    use: {
        // Debug support
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',

        // Timeout browser
        actionTimeout: 15 * 1000,
        navigationTimeout: 30 * 1000,

        // Viewport
        viewport: { width: 1280, height: 720 },

        // Bỏ qua HTTPS error nếu test staging
        ignoreHTTPSErrors: true,
    },

    // Browser projects
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        }
        // ,
        // {
        //     name: 'firefox',
        //     use: {
        //         ...devices['Desktop Firefox'],
        //     },
        // },
        // {
        //     name: 'webkit',
        //     use: {
        //         ...devices['Desktop Safari'],
        //     },
        // },
    ],
});
