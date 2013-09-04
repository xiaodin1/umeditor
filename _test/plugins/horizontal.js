module( "plugins.horizontal" );

//normal
test( 'trace 3587:horizontal', function() {
    var editor = te.obj[0];
    var d = editor.document;
    var range = te.obj[1];
    var db = editor.body;

    editor.setContent( '<b><i>top</i></b><p>bottom</p>' );
    if(!ua.browser.gecko){//ff下bug,用例无法执行，暂停
        setTimeout(function(){
            range.setStart( d.getElementsByTagName( 'i' )[0].firstChild, 0 ).setEnd( db.lastChild.firstChild, 5 ).select();
            editor.execCommand( 'horizontal' );
            equal( ua.getChildHTML( db ), '<hr><p>m<br></p>', "horizontal" );
            start();
        },50);
        stop();
    }
} );

test( 'horizontal&&collapsed', function() {//ie8下待确定
    var editor = te.obj[0];
    var range = te.obj[1];
    var db = editor.body;
    editor.setContent( '<b><i>top</i></b><p>bottom</p>' );
    range.setStart( db.lastChild.firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'horizontal' );
    ua.manualDeleteFillData(db);
    var spase = ua.browser.chrome?'<p></p>':'';
    if(ua.browser.ie)
        equal( ua.getChildHTML( db ), '<p><b><i>top</i></b></p>'+spase+'<p><hr>bottom</p>', "边界不在table里" );
    else
        equal( ua.getChildHTML( db ), '<p><b><i>top</i></b></p>'+spase+'<hr><p>bottom</p>', "边界不在table里" );
} );