@echo off
cls 
:menu
@color 2e
@mode con cols=80 lines=32
:start
@title Intellifusion Web版
@echo off
echo  ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
echo.■                       ☆  ★Intellifusion Web版★  ☆                   ■
echo  ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
echo ■               今天是:%date% 现在时刻:%time%               ■
echo.■────────────────────────────────────■
echo 采用node服务器，端口默认配置80，本地请在浏览器键入localhost或127.0.0.1浏览
echo 已启动web服务
echo.
@node index.js