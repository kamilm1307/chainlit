export default {
  translations: {
    components: {
      atoms: {
        buttons: {
          userButton: {
            menu: {
              settings: 'Settings',
              settingsKey: 'S',
              APIKeys: 'API Keys',
              logout: 'Logout'
            }
          }
        }
      },
      molecules: {
        newChatButton: {
          newChat: 'New Chat'
        },
        tasklist: {
          TaskList: {
            title: '🗒️ Task List',
            loading: 'Loading...',
            error: 'An error occured'
          }
        },
        attachments: {
          cancelUpload: 'Cancel upload',
          removeAttachment: 'Remove attachment'
        },
        newChatDialog: {
          clearChat:
            'This will clear the current messages and start a new chat.',
          cancel: 'Cancel',
          confirm: 'Confirm'
        },
        settingsModal: {
          expandMessages: 'Expand Messages',
          hideChainOfThought: 'Hide Chain of Thought',
          darkMode: 'Dark Mode'
        }
      },
      organisms: {
        chat: {
          history: {
            index: {
              lastInputs: 'Last Inputs',
              noInputs: 'Such empty...',
              loading: 'Loading...'
            }
          },
          inputBox: {
            input: {
              placeholder: 'Type your message here...'
            },
            speechButton: {
              start: 'Start recording',
              stop: 'Stop recording'
            },
            SubmitButton: {
              sendMessage: 'Send message',
              stopTask: 'Stop Task'
            },
            UploadButton: {
              attachFiles: 'Attach files'
            },
            waterMark: {
              buildWith: 'Build with'
            }
          },
          Messages: {
            index: {
              running: 'Running',
              executedSuccessfully: 'executed successfully',
              failed: 'failed',
              feedbackUpdated: 'Feedback updated',
              updating: 'Updating'
            }
          },
          dropScreen: {
            dropYourFilesHere: 'Drop your files here'
          },
          index: {
            failedToUpload: 'Failed to upload',
            cancelledUploadOf: 'Cancelled upload of',
            couldNotReachServer: 'Could not reach the server'
          },
          settings: {
            settingsPanel: 'Settings panel',
            reset: 'Reset',
            cancel: 'Cancel',
            confirm: 'Confirm'
          }
        },
        threadHistory: {
          sidebar: {
            filters: {
              FeedbackSelect: {
                feedbackAll: 'Feedback: All',
                feedbackPositive: 'Feedback: Positive',
                feedbackNegative: 'Feedback: Negative'
              },
              SearchBar: {
                search: 'Search'
              }
            },
            DeleteThreadButton: {
              confirmMessage:
                "This will delete the thread as well as it's messages and elements.",
              cancel: 'Cancel',
              confirm: 'Confirm',
              deletingChat: 'Deleting chat',
              chatDeleted: 'Chat deleted'
            },
            index: {
              pastChats: 'Past Chats'
            },
            ThreadList: {
              empty: 'Empty...'
            },
            TriggerButton: {
              closeSidebar: 'Close sidebar',
              openSidebar: 'Open sidebar'
            }
          },
          Thread: {
            backToChat: 'Go back to chat',
            chatCreatedOn: 'This chat was created on'
          }
        },
        header: {
          chat: 'Chat',
          readme: 'Readme'
        }
      }
    },
    hooks: {
      useLLMProviders: {
        failedToFetchProviders: 'Failed to fetch providers:'
      }
    },
    pages: {
      Design: {},
      Env: {
        savedSuccessfully: 'Saved successfully',
        requiredApiKeys: 'Required API Keys',
        requiredApiKeysInfo:
          "To use this app, the following API keys are required. The keys are stored on your device's local storage."
      },
      Login: {
        authTitle: 'Login to access the app.'
      },
      Page: {
        notPartOfProject: 'You are not part of this project.'
      },
      ResumeButton: {
        resumeChat: 'Resume Chat'
      }
    }
  }
};
