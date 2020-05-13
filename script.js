jQuery(function ($) {

	var supportsAudio = !!document.createElement('audio').canPlayType;

	if (supportsAudio) {

		// 初始化 Plyr
		var player = new Plyr('#player', {
			controls: [
				'restart',
				'play',
				'progress',
				'current-time',
				'duration',
				'mute',
				'volume'
			]
		});


		// 宣告與初始控制
		var index = 0,
				playing = false,
				// -----------------
				// 請設定這些路徑與檔名
				// -----------------
				mediaPath = "./Medias/no50/",
				tracks = [{
					"track": 1,
					"name": "2020年5月號小行星幼兒誌",
					"duration": "03:06",
					"file": "01.mp3"
				},{
					"track": 2,
					"name": "情緒劇場 最熟悉的臉",
					"duration": "06:35",
					"file": "02.mp3"
				},{
					"track": 3,
					"name": "幼年童話 最珍貴的獎品",
					"duration": "05:10",
					"file": "03.mp3"
				},{
					"track": 4,
					"name": "讀首小詩 擁抱",
					"duration": "02:46",
					"file": "04.mp3"
				},{
					"track": 5,
					"name": "動物新鮮事 小猴子愛理毛",
					"duration": "03:15",
					"file": "05.mp3"
				},{
					"track": 6,
					"name": "腦筋急轉彎 好想爸媽陪陪我",
					"duration": "03:35",
					"file": "06.mp3"
				},{
					"track": 7,
					"name": "小小探索家 鮮奶是怎麼來的？",
					"duration": "05:44",
					"file": "07.mp3"
				},{
					"track": 8,
					"name": "身體怎麼了 我會戴口罩",
					"duration": "03:24",
					"file": "08.mp3"
				},{
					"track": 9,
					"name": "故事音樂盒 小紅帽",
					"duration": "08:28",
					"file": "09.mp3"
				},{
					"track": 10,
					"name": "英文童謠 Three Blind Mice",
					"duration": "06:00",
					"file": "10.mp3"
				},{
					"track": 11,
					"name": "世界大不同 熱情的西班牙舞",
					"duration": "05:04",
					"file": "11.mp3"
				},{
					"track": 12,
					"name": "故事摩天輪 哥哥貓小橘",
					"duration": "05:06",
					"file": "12.mp3"
				},{
					"track": 13,
					"name": "知識讀本 我的家人不一樣",
					"duration": "12:24",
					"file": "13.mp3"
				},{
					"track": 14,
					"name": "2020年5月號小行星的祝福",
					"duration": "03:03",
					"file": "14.mp3"
				}],
				// -------
				// 設定結束
				// -------
				buildPlaylist = $.each(tracks, function(key, value) {
					var trackNumber = value.track,
							trackName = value.name,
							trackDuration = value.duration;
					if (trackNumber.toString().length === 1) {
							trackNumber = '0' + trackNumber;
					}
					$('#plList').append('<li> \
							<div class="plItem"> \
									<span class="plNum">' + trackNumber + '.</span> \
									<span class="plTitle">' + trackName + '</span> \
									<span class="plLength">' + trackDuration + '</span> \
							</div> \
					</li>');
				}),
				trackCount = tracks.length,

				// 顯示文字
				npAction = $('#npAction'),
				npTitle = $('#npTitle'),

				// 音樂播放器控制
				audio = $('#player').on('play', function () {
					playing = true;
					npAction.text('Now Playing...');
				}).on('pause', function () {
					playing = false;
					npAction.text('Paused...');
				}).on('ended', function () {
					npAction.text('Paused...');
					if ((index + 1) < trackCount) {
						index ++;
						loadTrack(index);
					} else {
						audio.pause();
						index = 0;
						loadTrack(index);
					}
				}).get(0),

				// 前一首
				btnPrev = $('#btnPrev').on('click', function () {
					if ((index - 1) > -1) {
							index--;
							loadTrack(index);
							if (playing) {
									audio.play();
							}
					} else {
							audio.pause();
							index = 0;
							loadTrack(index);
					}
				}),

				// 下一首
				btnNext = $('#btnNext').on('click', function () {
					if ((index + 1) < trackCount) {
							index++;
							loadTrack(index);
							if (playing) {
									audio.play();
							}
					} else {
							audio.pause();
							index = 0;
							loadTrack(index);
					}
				}),

				// 點擊曲目選單
				li = $('#plList li').on('click', function () {
					var id = parseInt($(this).index());
					if (id != index) {
						playTrack(id);
					}
				}),

				// 讀取音樂
				loadTrack = function (id) {
					npTitle.text(tracks[id].name);
					index = id;
					audio.src = mediaPath + tracks[id].file;
				},

				// 播放音樂
				playTrack = function (id) {
					loadTrack(id);
					audio.play();
				};

		// 預載第一首歌
		loadTrack(index);
	} else {
		// no audio support
		$('.column').addClass('hidden');
		var noSupport = $('#player').text();
		$('.container').append('<p class="no-support">' + noSupport + '</p>');
	}
});