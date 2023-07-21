import { workspace } from './workspace';
import { pushWorkspace } from './pushWorkspace';
import { exportPlantUML } from './exportPlantUML';
import { exportStructurizrDSL } from './exportStructurizrDSL';

const main = async () => {
  // Now either write the workspace to the Structurizr backend...
  // const response = await pushWorkspace(workspace);
  // if (response) {
  //   console.log('> workspace pushed to backend', response);
  // }

  // ... or render it as PlantUML
  const plantUmlLocation = 'plant.puml';
  exportPlantUML(plantUmlLocation, workspace);
  console.log('> workspace rendered as PlantUML at', plantUmlLocation);

  // ... or render it as StructurizrDSL
  const structurizrDslLocation = 'workspace.dsl';
  exportStructurizrDSL(structurizrDslLocation, workspace);
  console.log('> workspace rendered as StructurizrDSL at', structurizrDslLocation);
};

main().catch((e) => console.error('error', e));
