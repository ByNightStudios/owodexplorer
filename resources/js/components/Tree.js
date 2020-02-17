import React, { useState, useEffect } from 'react';
import * as go from 'gojs';

function Tree({ content }) {
    useEffect(() => {
        (content.length && content.length > 0) ? init(content) : console.log('Not Found')
    }, [content])

    function init(data) {
        // Array filtred and Sorted by key and boss
        /***************************** Three array sort / filter  **********************/	
        const ThreeArr = []
        const contents = data // console.log(contents)
        contents.forEach((item,index) => {

            var c = 0 // ThreeArr Item Key 
            for (const [key, value] of Object.entries(item)) {

                ThreeArr.push( 
                    {
                        key: c++,
                        name: key[0].toUpperCase() + key.slice(1)
                    },
                )                            
                for (const [ind, itm] of Object.entries(value)) {
                    for (const [ind2, itm2] of Object.entries(itm)) {
                        var filt_par = itm2.filter(fill => {
                            return fill.fields.title == ind2
                        })

                        ThreeArr.push(
                            { 
                                key: c++, 
                                boss: 0, // Important parent
                                name: filt_par[0].fields.title, 
                                exceptionalLong: filt_par[0].fields.exceptionalLong ? filt_par[0].fields.exceptionalLong.content[0].content[0].value.trim() : ' ', // Exeptional Long
                                foci: filt_par[0].fields.foci ? filt_par[0].fields.foci.trim() : ' ', // foci
                                focusDescriptor: filt_par[0].fields.focusDescriptor ? filt_par[0].fields.focusDescriptor.content[0].content[0].value.trim() : ' ',
                                interactions : filt_par[0].fields.interactions ? filt_par[0].fields.interactions.content[0].content[0].value.trim() : ' ',
                                testPool : filt_par[0].fields.testPool ? filt_par[0].fields.testPool.trim() : ' ',
                                level : filt_par[0].fields.level ? filt_par[0].fields.level : '0', //  Level
                                cost: filt_par[0].fields.cost ? filt_par[0].fields.cost.trim() : ' ',
                                errata : filt_par[0].fields.errata ? filt_par[0].fields.errata.content[0].content[0].value.trim() : ' ',
                            }
                        );

                        itm2.forEach((val, num) => {
                            var arr = ThreeArr.filter( tree => {
                                return tree.name == ind2 
                            });
                            if(val.fields.title != ind2){

                                ThreeArr.push(
                                    {
                                        key: c++, 
                                        boss: arr[0].key,
                                        name: val.fields.title.trim(), 
                                        exceptionalLong: val.fields.exceptionalLong ? val.fields.exceptionalLong.content[0].content[0].value.trim() : ' ',  // Exeptional Long
                                        foci: val.fields.foci ? val.fields.foci.trim() : ' ', // foci
                                        focusDescriptor: val.fields.focusDescriptor ? val.fields.focusDescriptor.content[0].content[0].value.trim() : ' ',
                                        interactions : val.fields.interactions ? val.fields.interactions.content[0].content[0].value.trim() : ' ',
                                        testPool : val.fields.testPool ? val.fields.testPool.trim() : ' ',
                                        level : val.fields.level ? val.fields.level : '0', //  Level
                                        cost: val.fields.cost ? val.fields.cost.trim() : ' ',
                                        errata : val.fields.errata ? val.fields.errata.content[0].content[0].value.trim() : ' ',
                                    }
                                );
                            }
        
                        });
                    }
                }
        
            }
        });

        ThreeArr.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        var G = go.GraphObject.make;  // for conciseness in defining templates
        var GDiagram = G(go.Diagram, "myDiagramDiv", {
            initialDocumentSpot: go.Spot.TopCenter,
            initialViewportSpot: go.Spot.TopCenter,
            layout: G(go.TreeLayout, {
                treeStyle: go.TreeLayout.StyleLastParents,
                angle: 90,
                layerSpacing: 80,
                alternateAngle: 0,
                alternateAlignment: go.TreeLayout.AlignmentStart,
                alternateNodeIndent: 20,
                alternateNodeIndentPastParent: 1,
                alternateNodeSpacing: 20,
                alternateLayerSpacing: 40,
                alternateLayerSpacingParentOverlap: 1,
                alternatePortSpot: new go.Spot(0, 0.999, 20, 0),
                alternateChildPortSpot: go.Spot.Left
            })
        })

        function theInfoTextConverter(info) {

            var str = "";
                if (info.exceptionalLong) str += "\n\nExceptional long:  " + info.exceptionalLong;
                if (info.foci) str += "\n\nFoci:  " + info.foci;
                if (info.focusDescriptor) str += "\n\nFocus Descriptor:  " + info.focusDescriptor;
                if (info.interactions) str += "\n\nInteractions:  " + info.interactions;
                if (info.testPool) str += "\n\nTest Pool:  " + info.testPool;
                if (info.level) str += "\n\nLevel:  " + info.level;
                if (info.cost) str += "\n\nCost:  " + info.cost;
                if (info.errata) str += "\n\nErrata:  " + info.errata;
                if (typeof info.boss === "number") {
                    var bossinfo = GDiagram.model.findNodeDataForKey(info.boss);
                    if (bossinfo !== null) {
                    str += "\n\nParent: " + bossinfo.name;
                    }
                }
                return str;
        }

        GDiagram.nodeTemplate = G(go.Node, "Auto", {
            isShadowed: true
                },G(go.Shape, "Rectangle",new go.Binding("fill", "isHighlighted", function(h) { return h ? "red" : "azure"; }).ofObject()),
                G(go.Panel, "Table",{ margin: 4, maxSize: new go.Size(220, NaN) },
                G(go.RowColumnDefinition,{
                    column: 0,
                    stretch: go.GraphObject.Horizontal,
                    alignment: go.Spot.Left
                    }),G(go.TextBlock,{
                        row: 0, column: 0,
                        maxSize: new go.Size(220, NaN), margin: 2,
                        font: "bold 11pt sans-serif",
                        // alignment: go.Spot.Top,
                        stretch: go.GraphObject.Horizontal,
                        textAlign: 'center',
                        },new go.Binding("text", "name")),G(go.TextBlock,{
                                row: 1, column: 0, columnSpan: 2,
                                font: "9pt sans-serif"
                            },new go.Binding("text", "", theInfoTextConverter)
                            )
                        )
        );

        GDiagram.linkTemplate = G(go.Link, go.Link.Orthogonal,
            { selectable: false },
			G(go.Shape, { stroke: '#222' })
        );
        var nodeDataArray = ThreeArr

        GDiagram.model = G(go.TreeModel,{
                nodeParentKeyProperty: "boss",  // this property refers to the parent node data
                nodeDataArray: nodeDataArray
        });
    } // Init Function End

    const divStyle = {
        backgroundColor: 'white',
        border: 'solid 1px black', 
        width: '99.8%', 
        height: '90vh',
    }
    return (
        <>
            <div id="sample" style={{position: 'relative'}}>
                <div id="myDiagramDiv" style={divStyle}></div>
                <div id="myOverviewDiv"></div>
            </div>
        </>
    )
}

export default Tree
