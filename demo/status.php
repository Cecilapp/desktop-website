<?php
// usage: php status.php <site> <target>
// last build of the site and last deployment of its publishing target (the app's SQLite database), as JSON
$p = new PDO('sqlite:'.getenv('APPDATA').'/cecil-desktop/database/database.sqlite');
$one = function (string $sql, array $args) use ($p) { $s = $p->prepare($sql); $s->execute($args); return $s->fetch(PDO::FETCH_ASSOC); };
$site = $one('select id from projects where name = ?', [$argv[1]]);
$target = $site ? $one('select id from deploy_targets where project_id = ? and name = ?', [$site['id'], $argv[2]]) : false;
echo json_encode([
  'site' => $site ? (int) $site['id'] : null,
  'target' => $target ? (int) $target['id'] : null,
  'build' => $site ? $one('select id,status from builds where project_id = ? order by id desc limit 1', [$site['id']]) : false,
  'deploy' => $target ? $one('select id,status from deployments where deploy_target_id = ? order by id desc limit 1', [$target['id']]) : false,
]);
