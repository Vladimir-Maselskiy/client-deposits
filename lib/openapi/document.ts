export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Client Deposits API",
    version: "1.0.0",
    description:
      "OpenAPI documentation for the client deposits assignment. The primary write flow creates a new deposit contract with an intentional 10-second delay.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Deposits",
      description: "Deposit contract creation endpoints",
    },
  ],
  paths: {
    "/api/deposits": {
      post: {
        tags: ["Deposits"],
        summary: "Create a deposit contract",
        description:
          "Creates a deposit contract for the active user. The response is intentionally delayed by 10 seconds to simulate a banking transaction.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateDepositPayload",
              },
              examples: {
                cardFunding: {
                  summary: "Fund deposit from a card",
                  value: {
                    selectedProgramId: "mock-program-uah",
                    amount: "20000",
                    customName: "My Reserve",
                    paymentMethod: "CARD",
                    selectedCardId: "mock-card-uah",
                    agreementText:
                      "APPLICATION FORM\nfor opening a bank deposit\n...",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Deposit contract created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateDepositResponse",
                },
              },
            },
          },
          400: {
            description: "Validation or business-rule error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                examples: {
                  insufficientFunds: {
                    summary: "Insufficient card balance",
                    value: {
                      message: "Insufficient card balance",
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
            description: "Human-entered amount string that is parsed on the server",
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
            description: "Required when paymentMethod is CARD",
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
