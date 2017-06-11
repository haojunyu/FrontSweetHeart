-- 创建用户hjy,密码为hjy
create user hjy identified by 'hjy';

-- 创建用户hjy管理的数据库SweetHeart;
create database `SweetHeart`;

-- 授权数据库SweetHeart给用户hjy
grant all on SweetHeart.* to 'hjy';


-- 数据导入部分
insert into users(id,name) values(1,'hjy');
insert into users(id,name) values(2,'xjm');