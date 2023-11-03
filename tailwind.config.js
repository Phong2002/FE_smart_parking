const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [ "./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {},
    colors:{
      'blue-phenikaa': '#223671',
      'orange-phenikaa': '#F26B25',
    }
  },
  plugins: [],
});
