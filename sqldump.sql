-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2016 at 01:05 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `droptune`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE IF NOT EXISTS `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(512) NOT NULL,
  `category` varchar(20) NOT NULL,
  `posted` timestamp NOT NULL,
  `rank` int(11) NOT NULL,
  `description` varchar(180) NOT NULL,
  `spotifyId` varchar(180) NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `link`, `category`, `posted`, `rank`, `description`, `spotifyId`, `title`) VALUES
(14, 'https://www.facebook.com/', 'article', '2016-05-10 23:49:36', 0, 'dasdas', '5fEWugSKjh5I5DQHl5tkFc', 'dasdas'),
(15, 'https://www.facebook.com/', 'article', '2016-05-10 23:50:25', 0, 'dasdas', '5fEWugSKjh5I5DQHl5tkFc', 'dasdas'),
(16, 'https://www.facebook.com/', 'live', '2016-05-10 23:55:58', 0, 'cxczxczxxxxxxxxxxxxxxxxx', '5fEWugSKjh5I5DQHl5tkFc', 'ADSASDASDASD'),
(17, 'https://www.facebook.com/', 'other', '2016-05-10 23:59:24', 0, 'cxczxczxxxxxxxxxxxxxxxxx', '5fEWugSKjh5I5DQHl5tkFc', 'ADSASDASDASD'),
(18, 'https://www.facebook.com/', 'cover', '2016-05-11 00:00:25', 1, 'zzzzzzzzzzzz', '2BgAyQY7yuYCJAUVTX1kRN', 'dasda'),
(19, 'http://stackoverflow.com/questions/2263096/css-file-is-not-refreshing-in-my-browser', 'behind the scenes', '2016-05-11 00:03:54', 2, 'vcvxcv', '2BgAyQY7yuYCJAUVTX1kRN', 'fsdfsd'),
(20, 'http://stackoverflow.com/questions/2263096/css-file-is-not-refreshing-in-my-browser', 'behind the scenes', '2016-05-11 00:04:20', 0, 'vcvxcv', '2BgAyQY7yuYCJAUVTX1kRN', 'fsdfsddasds'),
(21, '', 'live', '2016-05-11 00:16:40', 0, '', '2BgAyQY7yuYCJAUVTX1kRN', ''),
(22, 'http://stackoverflow.com/questions/180103/jquery-how-to-change-title-of-document-during-ready', 'other', '2016-05-11 01:03:43', 1, 'vvv', '1f80aAgo5ZqudbirQKEceV', 'vv');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `spotifyId` varchar(180) NOT NULL,
  `text` varchar(512) NOT NULL,
  `rating` int(11) NOT NULL,
  `posted` timestamp NOT NULL,
  `rank` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `spotifyId`, `text`, `rating`, `posted`, `rank`) VALUES
(98, '7t5m6zRwIEBxmPt8lNoPPi', 'old\n', 5, '2016-05-10 22:13:45', 1),
(99, '7t5m6zRwIEBxmPt8lNoPPi', 'new', 2, '2016-05-10 22:13:56', 0),
(100, '5fEWugSKjh5I5DQHl5tkFc', 'hgfhf', 4, '2016-05-10 23:53:23', 0),
(101, '2BgAyQY7yuYCJAUVTX1kRN', 'asdasdsadsada', 3, '2016-05-11 00:08:50', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
