import altImage from './../images/placeholder-img.jpg'
import generalImage from './../images/general-logo.png'
import filmImage from './../images/film.png'
import sportsImage from './../images/sports.png'
import booksImage from './../images/books.png'
import musicImage from './../images/music.png'
import tvImage from './../images/tv.png'
import mythologyImage from './../images/mythology.png'
import mangaImage from './../images/manga.png'
import videoGamesImage from './../images/video-games.png'
import animalsImage from './../images/animals2.png'
import celebritiesImage from './../images/celebrities.png'
import comicsImage from './../images/comics.png'
import theaterImage from './../images/theater.png'
import boardGamesImage from './../images/board-games2.png'
import computersImage from './../images/computers.png'
import mathematicsImage from './../images/mathematics.png'
import geographyImage from './../images/geography2.png'
import historyImage from './../images/history.png'
import scienceNatureImage from './../images/science-nature.png'
import politicsImage from './../images/politics.png'
import artImage from './../images/art.png'
import vehiclesImage from './../images/vehicles.png'
import gadgetsImage from './../images/gadgets.png'
import cartoonsImage from './../images/cartoons.png'

function cleanData (categories) {
  for (const category of categories) {
    if (category.name === 'General Knowledge') {
      category.coverImg = altImage
    } else if (category.name === 'Entertainment: Film') {
      category.coverImg = filmImage
      category.name = 'Film'
    } else if (category.name === 'Sports') {
      category.coverImg = sportsImage
    } else if (category.name === 'Entertainment: Books') {
      category.coverImg = booksImage
      category.name = 'Books'
    } else if (category.name === 'Entertainment: Music') {
      category.coverImg = musicImage
      category.name = 'Music'
    } else if (category.name === 'Entertainment: Television') {
      category.coverImg = tvImage
      category.name = 'Television'
    } else if (category.name === 'Mythology') {
      category.coverImg = mythologyImage
    } else if (category.name === 'Entertainment: Japanese Anime & Manga') {
      category.coverImg = mangaImage
      category.name = 'Anime & Manga'
    } else if (category.name === 'Entertainment: Video Games') {
      category.coverImg = videoGamesImage
      category.name = 'Video Games'
    } else if (category.name === 'Animals') {
      category.coverImg = animalsImage
    } else if (category.name === 'Celebrities') {
      category.coverImg = celebritiesImage
    } else if (category.name === 'Entertainment: Comics') {
      category.coverImg = comicsImage
      category.name = 'Comics'
    } else if (category.name === 'Entertainment: Musicals & Theatres') {
      category.name = 'Musicals & Theater'
      category.coverImg = theaterImage
    } else if (category.name === 'Entertainment: Board Games') {
      category.name = 'Board Games'
      category.coverImg = boardGamesImage
    } else if (category.name === 'Entertainment: Cartoon & Animations') {
      category.name = 'Cartoons'
      category.coverImg = cartoonsImage
    } else if (category.name === 'Science: Computers') {
      category.name = 'Computers'
      category.coverImg = computersImage
    } else if (category.name === 'Science: Mathematics') {
      category.name = 'Mathematics'
      category.coverImg = mathematicsImage
    } else if (category.name === 'Science: Gadgets') {
      category.name = 'Gadgets'
      category.coverImg = gadgetsImage
    } else if (category.name === 'Science & Nature') {
      category.coverImg = scienceNatureImage
    } else if (category.name === 'Geography') {
      category.coverImg = geographyImage
    } else if (category.name === 'History') {
      category.coverImg = historyImage
    } else if (category.name === 'Politics') {
      category.coverImg = politicsImage
    } else if (category.name === 'Art') {
      category.coverImg = artImage
    } else if (category.name === 'Vehicles') {
      category.coverImg = vehiclesImage
    } else {
      category.coverImg = generalImage
    }
  }
  return categories
}

export default cleanData
