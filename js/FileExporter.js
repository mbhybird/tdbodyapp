function saveAs(blob, filename) {
    var type = blob.type;
    var force_saveable_type = 'application/octet-stream';
    if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
    }

    var url = URL.createObjectURL(blob);
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = url;
    save_link.download = filename;

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
    URL.revokeObjectURL(url);
}

function exportToObj(scene, type) {

    var exporter = new THREE.OBJExporter();
    var result = exporter.parse(scene);

    var bb = new Blob([result], {type: "text/plain"});
    saveAs(bb, (type === 1 ? 'male' : 'female') + '.obj');
}

function save( blob, filename ) {
    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();
    // URL.revokeObjectURL( url ); breaks Firefox...
}

function saveString( text, filename ) {
    save( new Blob( [ text ], { type: 'text/plain' } ), filename );
}

function saveArrayBuffer( buffer, filename ) {
    save(new Blob([buffer], {type: 'application/octet-stream'}), filename);
}

function exportGLTF( input, type ) {
    var gltfExporter = new THREE.GLTFExporter();
    var options = {
        trs: false,
        onlyVisible: false,
        truncateDrawRange: false,
        binary: false
    };

    var fileName = type === 1 ? 'male' : 'female';
    gltfExporter.parse( input, function( result ) {
        if ( result instanceof ArrayBuffer ) {
            saveArrayBuffer( result, fileName + '.glb' );
        } else {
            var output = JSON.stringify( result, null, 2 );
            //console.log( output );
            saveString( output, fileName + '.gltf' );
        }
    }, options );
}
