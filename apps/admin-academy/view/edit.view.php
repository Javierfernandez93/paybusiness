<div class="container-fluid py-4" id="app">
    <editcourse-viewer @add-session="addSession" @select-session="selectSession" ref="course"></editcourse-viewer>
    <editsession-viewer @save-session="saveSession" ref="sessionViewer"> </editsession-viewer>
</div>