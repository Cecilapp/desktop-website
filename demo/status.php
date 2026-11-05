<?php
$p = new PDO('sqlite:'.getenv('APPDATA').'/cecil-desktop/database/database.sqlite');
$b = $p->query('select id,status from builds where project_id=2 order by id desc limit 1')->fetch(PDO::FETCH_ASSOC);
$d = $p->query('select id,status from deployments where deploy_target_id=1 order by id desc limit 1')->fetch(PDO::FETCH_ASSOC);
echo json_encode(['build' => $b, 'deploy' => $d]);
