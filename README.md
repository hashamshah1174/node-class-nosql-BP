## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- MongoDB installed and running locally or accessible remotely (if applicable)
- Docker (optional, for deployment)

### Installation

1. **Clone the repository and navigate into the project directory:**

   ```bash
   git clone <repository_url>
   cd <directory_path>

2. **Install dependencies:**

    ```bash
    npm install

3. **Set up environment variables:**

Create a `.env` file in the root directory of your project and add the following environment variables:

    ```plaintext
    # App configuration
    APP_MODE=dev
    APP_PORT=1338
    APP_HOST=127.0.0.1

    # JWT Tokens
    JWT_SECRET_KEY=<Your_JWT_Secret_Key>
    JWT_REFRESH_SECRET_KEY=<Your_JWT_Refresh_Secret_Key>
    JWT_SECRET_EXPIRE_IN=1h
    JWT_REFRESH_SECRET_EXPIRE_IN=30d

    # DigitalOcean Spaces Configuration
    DO_SPACES_ENDPOINT=<end point do>
    DO_SPACES_REGION=sgp1
    DO_SPACES_KEY=<Your_DigitalOcean_Spaces_Key>
    DO_SPACES_SECRET=<Your_DigitalOcean_Spaces_Secret>
    DO_SPACES_NAME=<spacename>
    DO_BUCKET_NAME=<buckent>
    DO_SUB_FOLDER=<subfolder>

    # PostgreSQL Database Configuration (Local)
    POSTGRESQL_HOST=localhost
    POSTGRESQL_USERNAME=postgres
    POSTGRESQL_PASSWORD=root
    POSTGRESQL_DATABASE=<dtabase>
    POSTGRESQL_PORT=5432
    POSTGRESQL_SSLMODE=false

    # Uncomment the below variables for DigitalOcean managed database connection
    # POSTGRESQL_HOST=<HOST>
    # POSTGRESQL_USERNAME=<User anme>
    # POSTGRESQL_PASSWORD=<Your_Database_Password>
    # POSTGRESQL_DATABASE=<database>
    # POSTGRESQL_PORT=25060
    # POSTGRESQL_SSLMODE=true

Replace <Your_...> placeholders with your actual credentials or values.

4. **Compile TypeScript and start the server::**

   ```bash
   npm run dev

## Contributing

We welcome contributions from the community! Please follow these guidelines when submitting pull requests:

    ```bash
  ### Fork the repository on GitHub and clone it to your local machine
    git clone <your_fork_url>
    cd <directory_path>
    
  ### Create a new branch from main for your feature or bug fix
    git checkout -b feature/my-feature
    
  ### Make your changes, ensuring they follow the project coding style and conventions
    
  ### Commit your changes with clear and descriptive messages
    git commit -am 'Add feature: My new feature'
    
  ### Push your changes to your forked repository
    git push origin feature/my-feature

Submit a pull request (PR) to the main branch of the original repository

## Technologies Used

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- JWT
- Swagger


### Explanation:

- **Contributing Section:** Combines all steps into one block using `bash` syntax where applicable (`git` commands).
- Steps are numbered implicitly by order and are separated logically by line breaks and comments.
- Encourages clear commit messages and pull request descriptions to facilitate smooth review and merging.
- **Technologies Used Section:** Lists the technologies utilized in the project.
- **License Section:** States the project's licensing information and provides a link to the detailed license file.

This markdown format now provides a concise and organized contribution guideline section, making it easier for contributors to follow the steps sequentially while maintaining clarity and structure in your project's README file. Adjust the details and links as necessary to fit your project's specific requirements.



