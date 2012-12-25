node-blog: Nodejser Blog
version: 0.1
=========
使用技术：

  nodejs + express + mongodb , 模板引擎使用jade

功能：

  version0.1 : 主要实现博客的核心功能： 文章发布

路由规划：

	前台：
	
		主页 /home (/)

		关于 /about

  		文章列表 /article

		文章详细 /article/:id

	后台管理：
	
		后台首页 /admin
		
		文章列表（删除) /admin/article
		
		编辑文章 /admin/article_edit , /admin/article_edit/:id

    ajax:

        登录  /login

        登出  /login_out

        文章删除 /admin/article_del/:id

