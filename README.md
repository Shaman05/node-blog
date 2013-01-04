node-blog: Nodejser Blog
version: 0.1

demo: 部署在appfog上的 http://www.nodejser.me/

=========
使用技术：

  nodejs + express + mongodb , 模板引擎使用ejs

  version 

	0.1   : 主要实现博客的核心功能： 文章发布
	
	0.1.1 : 完善文章分类、文章归档，添加搜索

路由规划：

	前台：
	
		主页 /home (/)
		
		关于 /about
		
		文章列表 /article
		
		文章详细 /article/:id
		
		标签相关文章 /tag/:tag
		
		搜索结果 /search/:keyword
		
		文章分类 /category/:category
		
		文章归档 /archive

	后台管理：
	
		后台首页 /admin
		
		登出  /login_out
		
		文章列表（删除) /admin/article
		
		编辑文章 /admin/article_edit , /admin/article_edit/:id

	ajax:
	
		登录  /login
		
		文章删除 /admin/article_del/:id
		
		编辑文章 /admin/article_edit
		
		
		
