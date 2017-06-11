-- 创建用户hjy,密码为hjy
create user hjy identified by 'hjy';

-- 创建用户hjy管理的数据库SweetHeart;
create database SweetHeart default character set utf8 collate utf8_general_ci;
create database SHTest default character set utf8 collate utf8_general_ci;

-- 授权数据库SweetHeart给用户hjy
grant all on SweetHeart.* to 'hjy';

use SweetHeart;
-- 数据导入部分
insert into users(id,name) values(1,'hjy');
insert into users(id,name) values(2,'xjm');

insert into categories(id, name,`desc`) values(1, 'cake', '蛋糕');
insert into categories(id, name,`desc`) values(2, 'biscuit', '饼干');
insert into categories(id, name,`desc`) values(3, 'pudding', '布丁');
insert into categories(id, name,`desc`) values(4, 'chocolate', '巧克力');

insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(11, 'creamCake','鲜奶蛋糕','这是鲜奶蛋糕',58,'creamCake.jpg', 0, 3, 1);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(12, 'fruitCake','水果蛋糕','这是水果蛋糕',58,'fruitCake.jpg', 0, 3, 1);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(13, 'personalCake','个性蛋糕','这是个性蛋糕',118,'personalCake.jpg', 0, 3, 1);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(14, 'mousseCake','慕斯蛋糕','这是慕斯蛋糕',78,'mousseCake.jpg', 0, 3, 1);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(15, 'flowerCake','鲜花蛋糕','这是鲜花蛋糕',78,'flowerCake.jpg', 0, 3, 1);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(16, 'layerCake','千层蛋糕','这是千层蛋糕',128,'layerCake.jpg', 0, 3, 1);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(17, 'paperCake','纸杯蛋糕','这是纸杯蛋糕',32.8,'paperCake.jpg', 0, 3, 1);


insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(21, 'cookies','曲奇饼干','这是曲奇饼干',32.8,'cookies.jpg', 0, 3, 2);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(22, 'Marguerite','玛格丽特','这是玛格丽特，一点都不像饼干的名字',32.8,'Marguerite.jpg', 0, 3, 2);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(23, 'cartoonCookies','卡通饼干','这是卡通饼干',32.8,'cartoonCookies.jpg', 0, 3, 2);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(24, 'cranberryCookies','蔓越莓饼干','这是蔓越莓饼干，一点都不像饼干的名字',32.8,'cranberryCookies.jpg', 0, 3, 2);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(25, 'xlkq','昔腊可球','这是昔腊可球',32.8,'xlkq.jpg', 0, 3, 2);

insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(31, 'creamPudding','奶油布丁','这是奶油布丁',32.8, 'creamPudding.jpg', 0, 3, 3);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(32, 'mangoPudding','芒果布丁','这是芒果布丁',32.8,'mangoPudding.jpg', 0, 3, 3);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(33, 'strawberryPudding','草莓布丁','这是草莓布丁',32.8,'strawberryPudding.jpg', 0, 3, 3);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(34, 'blueberryPudding','蓝莓布丁','这是蓝莓布丁',32.8,'blueberryPudding.jpg', 0, 3, 3);

insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(41, 'strawberryChocolate','草莓味巧克力','这是草莓味巧克力',32.8, 'strawberryChocolate.jpg', 0, 3, 4);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(42, 'lemonChocolate','柠檬味巧克力','这是柠檬味巧克力',32.8,'lemonChocolate.jpg', 0, 3, 4);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(43, 'matchaChocolate','抹茶味巧克力','这是抹茶味巧克力',32.8, 'matchaChocolate.jpg', 0, 3, 4);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(44, 'whiteMilkChocolate','白牛奶味巧克力','这是白牛奶味巧克力',32.8,'whiteMilkChocolate.jpg', 0, 3, 4);
insert into cakes(id, name, `desc`, detail, price, imgUrl, orders, stars, cateId) values(45, 'bitterSweetChocolate','苦甜味巧克力','这是苦甜味巧克力',32.8, 'bitterSweetChocolate.jpg', 0, 3, 4);



show VARIABLES like 'character%%';



