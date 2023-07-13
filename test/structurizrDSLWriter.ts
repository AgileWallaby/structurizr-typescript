import * as chai from "chai";
import * as snapshot from "mocha-chai-snapshot"
import { StructurizrDSLWriter, Workspace } from "../src";
import { createWorkspace, createWorkspaceWithSoftwareSystemNameOfMoreThanTwoWords } from "./workspace";

chai.use(snapshot);
const expect = chai.expect

export function testStructurizrDSLWriter() {
  const result = new StructurizrDSLWriter().toDSL(createWorkspace());
  expect(result).not.to.be.empty;
}

export function testStructurizrDSLWriterIsAbleToHandleProperlyPackageNameWithMultipleWords() {
  const workspace: Workspace = createWorkspaceWithSoftwareSystemNameOfMoreThanTwoWords();

  const expected = "@startuml\r\ntitle GPS tracking system - Containers\r\ncaption Container view for the GPS tracking system\r\npackage \"GPS tracking system\" {\r\n}\r\n@enduml";
  const result = new StructurizrDSLWriter().toDSL(workspace);

  expect(result.trim()).to.matchSnapshot(this);
}

