export default {
  translations: {
    components: {
      atoms: {
        buttons: {
          userButton: {
            menu: {
              settings: 'Configurações',
              settingsKey: 'S',
              APIKeys: 'Chaves de API',
              logout: 'Sair'
            }
          }
        }
      },
      molecules: {
        newChatButton: {
          newChat: 'Nova Conversa'
        },
        tasklist: {
          TaskList: {
            title: '🗒️ Lista de Tarefas',
            loading: 'Carregando...',
            error: 'Ocorreu um erro'
          }
        },
        attachments: {
          cancelUpload: 'Cancelar upload',
          removeAttachment: 'Remover anexo'
        },
        newChatDialog: {
          clearChat:
            'Isso limpará as mensagens atuais e iniciará uma nova conversa.',
          cancel: 'Cancelar',
          confirm: 'Confirmar'
        },
        settingsModal: {
          expandMessages: 'Expandir Mensagens',
          hideChainOfThought: 'Esconder Modo de Pensamento',
          darkMode: 'Modo Escuro'
        }
      },
      organisms: {
        chat: {
          history: {
            index: {
              lastInputs: 'Últimas Entradas',
              noInputs: 'Vazio...',
              loading: 'Carregando...'
            }
          },
          inputBox: {
            input: {
              placeholder: 'Digite sua mensagem aqui...'
            },
            speechButton: {
              start: 'Iniciar gravação',
              stop: 'Parar gravação'
            },
            SubmitButton: {
              sendMessage: 'Enviar mensagem',
              stopTask: 'Parar Tarefa'
            },
            UploadButton: {
              attachFiles: 'Anexar arquivos'
            },
            waterMark: {
              text: 'Construído com'
            }
          },
          Messages: {
            index: {
              running: 'Executando',
              executedSuccessfully: 'executado com sucesso',
              failed: 'falhou',
              feedbackUpdated: 'Feedback atualizado',
              updating: 'Atualizando'
            }
          },
          dropScreen: {
            dropYourFilesHere: 'Arraste seus arquivos aqui'
          },
          index: {
            failedToUpload: 'Falha ao enviar',
            cancelledUploadOf: 'Envio cancelado de',
            couldNotReachServer: 'Não foi possível conectar ao servidor'
          },
          settings: {
            settingsPanel: 'Painel de Configurações',
            reset: 'Redefinir',
            cancel: 'Cancelar',
            confirm: 'Confirmar'
          }
        },
        threadHistory: {
          sidebar: {
            filters: {
              FeedbackSelect: {
                feedbackAll: 'Feedback: Todos',
                feedbackPositive: 'Feedback: Positivo',
                feedbackNegative: 'Feedback: Negativo'
              },
              SearchBar: {
                search: 'Pesquisar'
              }
            },
            DeleteThreadButton: {
              confirmMessage:
                'Isso deletará o tópico, bem como suas mensagens e elementos.',
              cancel: 'Cancelar',
              confirm: 'Confirmar',
              deletingChat: 'Excluindo conversa',
              chatDeleted: 'Conversa excluída'
            },
            index: {
              pastChats: 'Conversas Anteriores'
            },
            ThreadList: {
              empty: 'Vazio...'
            },
            TriggerButton: {
              closeSidebar: 'Fechar barra lateral',
              openSidebar: 'Abrir barra lateral'
            }
          },
          Thread: {
            backToChat: 'Voltar para a conversa',
            chatCreatedOn: 'Esta conversa foi criada em'
          }
        },
        header: {
          chat: 'Conversa',
          readme: 'Sobre'
        }
      }
    },
    hooks: {
      useLLMProviders: {
        failedToFetchProviders: 'Falha ao buscar provedores:'
      }
    },
    pages: {
      Design: {},
      Env: {
        savedSuccessfully: 'Salvo com sucesso',
        requiredApiKeys: 'Chaves de API necessárias',
        requiredApiKeysInfo:
          'Para usar este aplicativo, as seguintes chaves de API são necessárias. As chaves são armazenadas no armazenamento local do seu dispositivo.'
      },
      Login: {
        authTitle: 'Faça login para acessar o aplicativo.'
      },
      Page: {
        notPartOfProject: 'Você não faz parte deste projeto.'
      },
      ResumeButton: {
        resumeChat: 'Continuar Conversa'
      }
    }
  }
};
