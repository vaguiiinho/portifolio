export const projectFormContent = {
  validation: {
    titleTooShort: "Title must be at least 3 characters",
    descriptionTooShort: "Description must be at least 10 characters",
    noTechStack: "Add at least one technology",
    invalidGithubUrl: "GitHub URL must be a valid URL",
    invalidLiveUrl: "Live URL must be a valid URL",
    invalidVideoSource: "Video must be a valid URL, upload path, or video file",
  },
  helperText: {
    videoCurrent: "Current video",
    videoKeepExisting: "Leave the URL empty to keep it unchanged",
    videoUpload:
      "Optional. Uploading a file avoids the JSON body size limit.",
    detailsTitle: "Project blocks",
    detailsDescription:
      "Edit the three sections shown inside the project detail modal.",
    submitHelp:
      "Fill in the project data and save it to the backend.",
  },
} as const
