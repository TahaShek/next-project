import MainNavigation from "./MainNaviagation";
import classes from "./Layout.module.css";
function Layout(props) {
  // console.log(props.children);/
  return (
    <div>
      <MainNavigation></MainNavigation>

      <div className={classes.main}>{props.children}</div>
    </div>
  );
}
export default Layout;
