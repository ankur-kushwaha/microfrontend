import habitat from "preact-habitat";


import Widget from "./component";
import Widget2 from "./component2";

let _habitat = habitat(Widget);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});


