# Contributing

Contributing is fun and easy. Please consider taking a look at the [open issues](https://github.com/haydenlinder/blog/issues) for this project, which may serve as a good source for blog-worthy challenges.

## 1. Fork

Go to [the repo](https://github.com/haydenlinder/blog) for this project and fork it.

Clone your fork locally:
```bash
git clone https://github.com/yourname/blog.git
```
Set the remote "upstream" to the original repo.
```bash
git remote add upstream https://github.com/haydenlinder/blog.git
```

## 2. Run Locally
First, run the development server:

```bash
cd blog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 3. Write

Create a new markdown (.md) file in the **/markdown/** folder. Use dash-deliniated file names, for example: **New-Blog-Post.md**.

Write some [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Run 
```bash
npm run parse
```

Visit [http://localhost:3000/New-Blog-Post](http://localhost:3000/New-Blog-Post), but replace *New-Blog-Post* with the name of the file you created, excluding the .md extension.

## 4. Publish
```bash
git push origin main
```
Then open a pull request.