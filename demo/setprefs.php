<?php
// usage: php setprefs.php appearance=light language=en open_last_site=false
$p = new PDO('sqlite:'.getenv('APPDATA').'/cecil-desktop/database/database.sqlite');
foreach (array_slice($argv, 1) as $kv) { [$k, $v] = explode('=', $kv, 2);
  $json = in_array($v, ['true','false']) ? $v : json_encode($v);
  $s = $p->prepare('insert into settings(key,value,created_at,updated_at) values(?,?,datetime(),datetime()) on conflict(key) do update set value=excluded.value, updated_at=datetime()');
  $s->execute([$k, $json]); echo "$k=$json\n"; }
