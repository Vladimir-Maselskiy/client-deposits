export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "API депозитів клієнта",
    version: "1.0.0",
    description:
      "OpenAPI документація для тестового завдання з депозитів клієнта. Основний write-flow створює новий договір вкладу з навмисною затримкою відповіді на 10 секунд.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Локальний сервер розробки",
    },
  ],
  tags: [
    {
      name: "Deposits",
      description: "Ендпоінти створення договору вкладу",
    },
  ],
  paths: {
    "/api/deposits": {
      post: {
        tags: ["Deposits"],
        summary: "Створити договір вкладу",
        description:
          "Створює договір вкладу для активного користувача. Відповідь навмисно затримується на 10 секунд для емуляції банківської транзакції.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateDepositPayload",
              },
              examples: {
                cardFunding: {
                  summary: "Поповнення вкладу з картки",
                  value: {
                    selectedProgramId: "mock-program-uah",
                    amount: "20000",
                    customName: "Мій резерв",
                    paymentMethod: "CARD",
                    selectedCardId: "mock-card-uah",
                    agreementText:
                      "ЗАЯВА-АНКЕТА\nна відкриття банківського вкладу\n...",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Договір вкладу успішно створено",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateDepositResponse",
                },
              },
            },
          },
          400: {
            description: "Помилка валідації або бізнес-логіки",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                examples: {
                  insufficientFunds: {
                    summary: "Недостатньо коштів на картці",
                    value: {
                      message: "Недостатньо коштів на картці",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Currency: {
        type: "string",
        enum: ["UAH", "USD", "EUR"],
      },
      PaymentMethod: {
        type: "string",
        enum: ["CASH", "CARD"],
      },
      CreateDepositPayload: {
        type: "object",
        required: [
          "selectedProgramId",
          "amount",
          "customName",
          "paymentMethod",
          "selectedCardId",
          "agreementText",
        ],
        properties: {
          selectedProgramId: {
            type: "string",
          },
          amount: {
            type: "string",
            description: "Сума, введена користувачем у вигляді рядка, яку сервер додатково парсить",
          },
          customName: {
            type: "string",
          },
          paymentMethod: {
            $ref: "#/components/schemas/PaymentMethod",
          },
          selectedCardId: {
            type: "string",
            nullable: true,
            description: "Обов’язкове поле, якщо paymentMethod = CARD",
          },
          agreementText: {
            type: "string",
          },
        },
      },
      CreateDepositResponse: {
        type: "object",
        required: ["contractId", "amount", "currency", "programName", "createdAt"],
        properties: {
          contractId: {
            type: "string",
          },
          amount: {
            type: "number",
          },
          currency: {
            $ref: "#/components/schemas/Currency",
          },
          programName: {
            type: "string",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["message"],
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
} as const;
