import img1 from './ios-menu.jpg'
import img2 from './ios-menu-2.jpg'
import img3 from './ios-menu-3.jpg'

export const showIosNotice = () => {

  document.getElementById("iosNotice").style.visibility="visible";
  document.getElementById('img1').src=img1.toString();
  document.getElementById('img2').src=img2.toString();
  document.getElementById('img3').src=img3.toString();
};
