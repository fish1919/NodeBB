define(function() {
	var	Admin = {};

	Admin.init = function() {
		ajaxify.register_events(['api:get_all_rooms']);
		socket.on('api:get_all_rooms', function(data) {

			var active_users = document.getElementById('active_users'),
				total = 0;
				active_users.innerHTML = '';

			for (var room in data) {
				if (room !== '') {
					var count = data[room].length;
					total += count;
					active_users.innerHTML = active_users.innerHTML + "<div class='alert alert-success'><strong>" + room + "</strong> " + count + " active user" + (count > 1 ? "s" : "") + "</div>";
				}
			}

			document.getElementById('connections').innerHTML = total;
		});

		app.enterRoom('admin');
		socket.emit('api:get_all_rooms');

		$('#logout-link').on('click', function() {
			$.post(RELATIVE_PATH + '/logout', {
				_csrf: $('#csrf_token').val()
			}, function() {
				window.location.href = RELATIVE_PATH + '/';
			});
		})
	};

	return Admin;
});
