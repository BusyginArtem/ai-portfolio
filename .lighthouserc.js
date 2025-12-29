module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "npm run start",
      url: ["http://localhost:3000"],
      settings: {
        // This forces Lighthouse to use "Desktop" settings
        preset: "desktop",
        // Or manually disable throttling if the CI is too slow
        throttlingMethod: "provided",
      },
    },
    assert: {
      assertions: {
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
      githubToken:
        process.env.LHCI_GITHUB_TOKEN || process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
