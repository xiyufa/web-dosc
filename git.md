# git常用命令
---

git学习可以参考[廖雪峰的git教程](https://www.liaoxuefeng.com/wiki/896043488029600)，轻松入门，实用性强

+ `git init` 创建版本库

+ `git add readme.md` `git add .` 将readme文件/所有文件添加到暂存区

+ `git commit -m <message>` 将暂存区的文件提交到当前分支

+ `git commit --amend` 修改上次提交的内容，如果设置了`git`默认编辑器则会打开编辑上次提交的信息，没有设置默认编辑器会尝试打开vim等编辑器

+ `git status` 查看当前仓库的状态

+ `git clone` 项目仓库拷贝

+ `git diff` 查看具体被修改文件的具体修改内容

+ `git log` 查看当前提交的历史记录

+ `git reset --hard <commit_id>` 回退/前进到指定版本

+ `git reflog` 查看未来提交的历史记录

+ `git checkout -- <file>` 放弃工作区修改内容

+ `git reset HEAD <file>` 从暂存区将文件撤离到工作区

+ `git remote add <remote-name> <path>` 将本地库关联到指定远程库

+ `git remote rm <remote-name>` 删除与指定远程库关联

+ `git remote -v` 查看当前远程库信息

+ `git push <remote-name> <branch-name>` 推送指定分支到指定远程库

+ `git push -u origin master` 将本地master分支推送给远程origin仓库，
> `-u`指定origin为默认主机，以后使用`git push` 代替 `git push origin master`

+ `git branch` 查看当前所有分支和所在分支

+ `git branch <branch-name>` 创建分支

+ `git checkout <branch-name>` 切换到指定分支

+ `git checkout -b <branch-name>` 创建并切换到指定分支

+ `git merge <branch-name>` 合并指定分支到当前分支，此时可能会产生冲突，需手动解决

+ `git branch -d <branch-name>` 删除指定分支

+ `git stash` 存储当前工作

+ `git stash pop` 回到存储工作现场

+ `git pull` 抓取远程仓库内容，此时可能会产生冲突，需要手动解决冲突

+  `git checkout -b <branch-name> <remote-name>/<branch-name>` 在本地创建和远程分支对应的分支

+ `git branch --set-upstream <branch-name> <remote-name>/<branch-name>` 建立本地分支和远程分支的关联

+ `git tag <tagname> <commit_id>` 创建一个标签，不指定<commit_id>默认为HEAD

+ `git tag` 查看所有标签

+ `git tag -a <tagname> -m <message>` 指定标签的信息

+ `git push <remote-name> <tagname>` 推送一个本地标签

+ `git push <remote-name> --tags` 推送全部未推送过的本地标签

+ `git tag -d <tagname>` 删除一个本地标签

+ ` git push <remote-name> refs/tags/<tagname>` 删除一个远程标签
 