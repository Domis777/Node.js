create table genre (
	genre_id int4 unsigned primary key auto_increment,
  genre varchar(64) not null unique,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

create table platform (
	platform_id int4 unsigned primary key auto_increment,
  platform varchar(64) not null unique,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

create table publisher (
	publisher_id int4 unsigned primary key auto_increment,
  publisher varchar(128) not null unique,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

create table image (
	image_id int4 unsigned primary key auto_increment,
  src varchar(512) not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

create table user (
	user_id int4 unsigned primary key auto_increment,
  email varchar(64) not null unique,
  name varchar(64) not null,
  surname varchar(64) not null,
  password varchar(64) not null,
  phone varchar(16) not null,
  role enum ('USER', 'ADMIN') default 'USER',
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

create table `order` (
	order_id int4 unsigned primary key auto_increment,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

create table game (
	game_id int4 unsigned primary key auto_increment,
  title varchar(128) not null unique,
  price float4 unsigned not null,
  publisher_id int4 unsigned not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp,
  foreign key (publisher_id) references publisher(publisher_id)
);

create table user_order (
	user_id int4 unsigned not null,
  order_id int4 unsigned not null primary key,
  foreign key (user_id) references user(user_id),
  foreign key (order_id) references `order`(order_id)
);

create table game_order (
	order_id int4 unsigned not null,
  game_id int4 unsigned not null primary key,
  foreign key (order_id) references `order`(order_id),
  foreign key (game_id) references game(game_id)
);

create table game_genre (
	genre_id int4 unsigned not null,
  game_id int4 unsigned not null,
  foreign key (genre_id) references genre(genre_id),
  foreign key (game_id) references game(game_id),
  primary key (genre_id, game_id)
);

create table game_platform (
	platform_id int4 unsigned not null,
  game_id int4 unsigned not null,
  foreign key (platform_id) references platform(platform_id),
  foreign key (game_id) references game(game_id),
  primary key (platform_id, game_id)
);

create table game_image (
	game_id int4 unsigned not null,
  image_id int4 unsigned not null primary key,
  foreign key (game_id) references game(game_id),
  foreign key (image_id) references image(image_id)
);

create table user_image (
	user_id int4 unsigned not null,
  image_id int4 unsigned not null primary key,
  foreign key (user_id) references user(user_id),
  foreign key (image_id) references image(image_id)
);

create table user_game_rating (
	user_id int4 unsigned not null,
  game_id int4 unsigned not null,
  rating int2 unsigned not null,
  foreign key (user_id) references user(user_id),
  foreign key (game_id) references game(game_id),
  primary key (user_id, game_id)
);