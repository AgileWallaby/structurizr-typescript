import { describe, it } from "mocha";
import { testApiCompatitbility, testApiIdempotency } from "./api-compatibility";
import { testPlantUMLWriter, testPlantUMLWriterIsAbleToHandleProperlyPackageNameWithMultipleWords } from "./plantUMLWriter";
import { testStructurizrDSLWriter, testStructurizrDSLWriterIsAbleToHandleProperlyPackageNameWithMultipleWords } from "./structurizrDSLWriter";
import { testElementStyleThemeExport, testFullThemeExport } from "./themeExport";
import * as  deepEqualInAnyOrder from 'deep-equal-in-any-order';
import * as chai from "chai";
import { regression } from "./regression";
import { implicitRelationships } from "./implicitRelationships";
import { delivers } from "./delivers";
chai.use(deepEqualInAnyOrder);


describe("structurizr-typescript", () => {

    describe("api", () => {
        it("should be compatible to the server side API", testApiCompatitbility).timeout(15000);
        it("merging unchanged workspaces should be idempotent", testApiIdempotency).timeout(30000);
    });

    describe("client", () => {
        describe("plantUML", () => {
            it("export plant UML diagrams correctly", testPlantUMLWriter);
            it(
                "handles long system names properly when exporting as package in container view",
                testPlantUMLWriterIsAbleToHandleProperlyPackageNameWithMultipleWords
            );
            it("export dsl", testStructurizrDSLWriter);
            it("export other dsl", testStructurizrDSLWriterIsAbleToHandleProperlyPackageNameWithMultipleWords);
        })
    });

    describe("core", () => {
        describe("theme export", () => {
            it("should not export undefined fields", testElementStyleThemeExport);
            it("should export element and relationship styles", testFullThemeExport);
        });
    });

    describe("regression", regression);

    describe("implicitRelationships", implicitRelationships);

    describe("delivers", delivers);
});