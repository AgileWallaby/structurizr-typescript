import { Workspace, SystemContextView, ContainerView, DeploymentView, View, Element, RelationshipView, Person, SoftwareSystem, Container, Relationship, ComponentView, Component, StaticView, StaticStructureElement } from "../../core";
import { DeploymentNode } from "../../core/model/deploymentNode";
import { ContainerInstance } from "../../core/model/containerInstance";

class StringWriter {
    private value = "";

    public write(content: string): void {
        this.value += content;
    }

    public writeLine(content: string): void {
        this.write(content);
        this.newline();
    }

    public newline(): void {
        this.write("\r\n");
    }

    public toString(): string {
        return this.value;
    }
}

export class StructurizrDSLWriter {

    public toDSL(workspace: Workspace): string {
        const result = new StringWriter();

        if (workspace) {
            result.writeLine(`workspace "${workspace.name}" "${workspace.description} {`);
            result.writeLine('model {');
            result.writeLine('}');
            result.writeLine('views {');
            result.writeLine('}');
        }

        return result.toString();
    }
}