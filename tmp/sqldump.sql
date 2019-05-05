CREATE TABLE `user`
(
  `id` int UNIQUE NOT NULL,
  `name` varchar(255),
  `lastname` varchar(255),
  `email` varchar(255),
  `social_number` varchar(255),
  `role` varchar(255),
  `password` varchar(255)
);

CREATE TABLE `expense`
(
  `id` int UNIQUE NOT NULL,
  `responsible_user_id` int NOT NULL,
  `amount` float,
  `concept` varchar(255),
  `creation_date` timestamp
);

CREATE TABLE `property`
(
  `id` int UNIQUE NOT NULL,
  `residency_id` int NOT NULL,
  `property_type_id` int,
  `user_id` int NOT NULL,
  `yardage` float,
  `deparment_num` varchar(255)
);

CREATE TABLE `property_service`
(
  `id` int UNIQUE NOT NULL,
  `service_id` int,
  `property_id` int
);

CREATE TABLE `property_type`
(
  `id` int UNIQUE NOT NULL,
  `name` varchar(255) UNIQUE NOT NULL,
  `multiplier_factor` float
);

CREATE TABLE `bill`
(
  `id` int UNIQUE NOT NULL,
  `property_id` int NOT NULL,
  `monthly_payment` float,
  `debt` float,
  `special_fee` float,
  `other` float,
  `creation_date` timestamp
);

CREATE TABLE `debt`
(
  `id` int UNIQUE NOT NULL,
  `property_id` int NOT NULL,
  `amount` float,
  `description` varchar(255),
  `status` enum,
  `creation_date` timestamp
);

CREATE TABLE `service`
(
  `id` int UNIQUE NOT NULL,
  `residency_id` int NOT NULL,
  `price` float,
  `name` varchar(255)
);

CREATE TABLE `residency`
(
  `id` int UNIQUE NOT NULL,
  `admin_id` int NOT NULL,
  `name` char,
  `yardage` float
);
