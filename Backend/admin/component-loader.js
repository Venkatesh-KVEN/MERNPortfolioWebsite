import path from  'path'
import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

componentLoader.add(
  'DraggableList',
  path.join(process.cwd(), 'admin/components/DraggableList')
)

export default componentLoader