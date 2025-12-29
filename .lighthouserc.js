module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "npm run start",
      url: ["http://localhost:3000"],
      settings: {
        preset: "desktop",
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
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
      githubToken: process.env.LHCI_GITHUB_TOKEN,
    },
  },
};
