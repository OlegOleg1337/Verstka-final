# Webpack Static Site Starter Kit

## Project Requirements

- [Node 20.17.0](https://nodejs.org/en/download/package-manager)
- [NVM for macOS](https://tecadmin.net/install-nvm-macos-with-homebrew/)
- [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases) (If using Windows, installation must be done as an administrator)
- [Yarn](https://yarnpkg.com/)

---

## Usage

1. Clone the repository:

```bash
git clone https://github.com/Habsida-Projects/webpack-static-template
```

2. Open terminal in webpack-static-template directory

3. Delete the `.git` folder manually or with command:

```bash
rm -rf .git
```

The old .git folder contains a link to the repository you cloned the project from. You will create a new .git folder with a link to your own repository.
---

## If Creating a New Project on github.com

You need to initialize a new Git repository. _If this command fails, it may be because your Git version is outdated, and you will need to update it._

```properties
git init -b main
```

Add all changes and make the initial commit:

```properties
git add . && git commit -m "initial commit"
```

Link the local repository to the remote repository; replace *USER* (your GitHub username) and *REPO* (your repository name):

```properties
git remote add origin https://github.com/USER/REPO.git
```

Verify the connection:

```properties
git remote -v
```

Push the changes to the remote repository:

```properties
git push origin main
```

---

## Checking the Node Version

This should output version 20.17.0:

```properties
node -v
```

---

## Two Methods for Installing Dependencies

Install dependencies using NPM:

```properties
npm install
```

Install dependencies using Yarn:

```properties
yarn
```

---

## Two Methods for Running the Application

To start the web server using NPM:

```properties
npm start
```

To start the web server using Yarn:

```properties
yarn start
```

---

## Two Methods for Deploying to GitHub Pages

### Your repository must be linked to a GitHub repository. After linking, proceed with the following:

Deploy to GitHub Pages using NPM:

```properties
npm run deploy
```

Deploy to GitHub Pages using Yarn:

```properties
yarn deploy
```

Read [this article](hhttps://dev.to/anitaparmar26/webpack-5-guide-for-beginners-314c).