<div class="container-fluid py-4" id="app">
    <addcourse-viewer @add-session="addSession" @select-session="selectSession" ref="course"></addcourse-viewer>
    <addsession-viewer @save-session="saveSession" ref="sessionViewer"> </addsession-viewer>
</div>