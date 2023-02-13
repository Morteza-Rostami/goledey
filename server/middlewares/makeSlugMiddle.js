import RTLArabic from 'rtl-arabic';
import Randomstring from 'randomstring';

// slug creater:
const makeSlug = (req, res, next) => {
 
  // const images = []
  //   for (let key in req.files) {images.push(req.files[key][0]);}
  // console.log(images);
  //   return;
  // if not req.body.name : try: -> req.body.title
  let text = req.body.name || req.body.title;

  // if name is empty generate a random code:

  function generateProductCode() {
    return Randomstring.generate({
      length: 8,
      charset: 'numeric',
      capitalization: 'lowercase',
    });
  }

  function generateRandSlug() {
    return Randomstring.generate({
      length: 10,
      charset: 'custom',
      capitalization: 'lowercase',
    });
  }


  const randStr = generateProductCode();
  req.randStr = randStr;
console.log(text)
  if (!text?.length) {
    text = randStr;
  }

  // make slug:
  let slug = '';

  // remove chars like: &, ?, %
  // slug = text.replaceAll(/&/g, ' ');
  // slug = text.replaceAll(/?/g, ' ');

  text = text.replaceAll('?', ' ');
  text = text.replaceAll('&', ' '); 

  // remove whitespace from the end of the string
  slug = text.trim();
  // replace whitespace between words with: hiphen.
  slug = slug.replace(/\s/g, '-');

  // add random string to slug
  slug += '-' + generateRandSlug();

  // store sulg in req_obj
  req.slug = slug;

  // next
  next();
}

export default makeSlug;