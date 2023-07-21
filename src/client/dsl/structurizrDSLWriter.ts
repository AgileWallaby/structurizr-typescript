import { Workspace, Model, SystemContextView, ContainerView, DeploymentView, ViewSet, View, Element, RelationshipView, Person, SoftwareSystem, Container, Relationship, ComponentView, Component, StaticView, StaticStructureElement } from "../../core";
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
            result.writeLine(`workspace "${workspace.name}" "${workspace.description}" {`);
            this.writeModel(result, workspace.model);
            this.writeViews(result, workspace.views);
            result.writeLine('}');
        }

        return result.toString();
    }

    private writeModel(writer: StringWriter, model: Model): void {
        writer.writeLine('model {');
        this.writeSoftwareSystems(writer, model.softwareSystems);
        this.writePeople(writer, model.people)
        for (const relationship of model.relationships) {
            const technology = relationship.technology ? `"${relationship.technology}"` : "";
            writer.writeLine(`${this.getId(relationship.source)} -> ${this.getId(relationship.destination)} "${relationship.description}" ${technology}`);
        }
        writer.writeLine('}');
    }

    private writeSoftwareSystems(writer: StringWriter, softwareSystems: SoftwareSystem[]): void {
        for (const softwareSystem of softwareSystems) {
            this.writeSoftwareSystem(writer, softwareSystem);
        }
    }

    private writeSoftwareSystem(writer: StringWriter, softwareSystem: SoftwareSystem): void {
        writer.writeLine(`${softwareSystem.type}${softwareSystem.id} = softwareSystem "${softwareSystem.name}" {`);
        writer.writeLine(`description "${softwareSystem.description}"`);
        this.writeContainers(writer, softwareSystem.containers)
        writer.writeLine('}');
    }

    private writePeople(writer: StringWriter, people: Person[]): void {
        for (const person of people) {
            this.writePerson(writer, person);
        }
    }

    private writePerson(writer: StringWriter, person: Person): void {
        writer.writeLine(`${person.type}${person.id} = person "${person.name}" "${person.description}" {`);
        writer.writeLine('}');
    }

    private writeContainers(writer: StringWriter, containers: Container[]): void {
        for (const container of containers) {
            this.writeContainer(writer, container);
        }
    }

    private writeContainer(writer: StringWriter, container: Container): void {
        writer.writeLine(`${container.type}${container.id} = container "${container.name}" {`);
        writer.writeLine(`description "${container.description}"`);
        writer.writeLine(`technology "${container.technology}"`);
        writer.writeLine('}');
    }

    private writeComponents(writer: StringWriter, components: Component[]): void {
        for (const component of components) {
            this.writeComponent(writer, component);
        }
    }

    private writeComponent(writer: StringWriter, component: Component): void {
        writer.writeLine(`${component.type}${component.id} = component "${component.name}" {`);
        writer.writeLine(`description "${component.description}"`);
        writer.writeLine(`technology "${component.technology}"`);
        writer.writeLine('}');
    }

    private writeViews(writer: StringWriter, views: ViewSet): void {
        writer.writeLine('views {');
        for (const view of views.systemContextViews) {
            writer.writeLine(`systemContext ${this.getId(view.softwareSystem!)} "${view.key}" {`)
            for (const elementView of view.elements) {
                writer.writeLine(`include ${this.getId(elementView.element)}`)
            }
            writer.writeLine('}');
        }
        for (const view of views.containerViews) {
            writer.writeLine(`container ${this.getId(view.softwareSystem!)} "${view.key}" {`)
            for (const elementView of view.elements) {
                writer.writeLine(`include ${this.getId(elementView.element)}`)
            }
            for (const relationshipView of view.relationships) {
                relationshipView.
                writer.writeLine(`include ${this.getId(relationshipView.relationship)}`)
            }
            writer.writeLine('}');
        }
        writer.writeLine('theme default');
        writer.writeLine('}');
    }

    private getId(element: Element): string {
        return `${element.type}${element.id}`;
    }
}