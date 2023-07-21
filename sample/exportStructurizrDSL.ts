import * as fs from 'fs'
import { Workspace, StructurizrDSLWriter } from "structurizr-typescript"

export const exportStructurizrDSL = (location: string, workspace: Workspace) => {
    const plantUML = new StructurizrDSLWriter().toDSL(workspace);
    fs.writeFileSync(location, plantUML);
};