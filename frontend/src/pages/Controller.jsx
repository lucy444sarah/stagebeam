import { ObjectsMenu } from "../components/ObjectsMenu"
import { Timeline } from "../components/Timeline"
import { Workspace } from "../components/Workspace"

export const Controller = () => {
  return (
    <>
    <ObjectsMenu/>
    <Timeline/>
    <Workspace/> {/*  order matters for overlap, ignoring the set z-index. Yes. Really. I hate it as well. /LZ */}
    </>
          )
}
