import custom from "./core-with-types"
import BUILD from "./config"

const FUTILITY = custom(BUILD.CHECKED)
export default FUTILITY.weld(FUTILITY, {
  custom,
  version: "4.0.0",
  configuration: BUILD.CHECKED
})