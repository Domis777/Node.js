const SELECT = `
select
gm.game_id,
  gm.title,
  gm.price,
  json_object(
  'publisher', pb.publisher,
  'genres', (if(count(gmg.game_id) = 0, json_array(), gmg.genres)),
  'platforms', (if(count(gmp.game_id) = 0, json_array(), gmp.platforms))
  ) as information,
  if(count(gmi.game_id) = 0, json_array(), gmi.images) as images
from game as gm
join publisher as pb
on pb.publisher_id = gm.publisher_id
left join (
select
if(count(gr.genre_id) = 0, json_array(), json_arrayagg(gr.genre)) as genres,
  gm.game_id
from game as gm
join game_genre as gg
on gm.game_id = gg.game_id
join genre as gr
on gg.genre_id = gr.genre_id
group by gm.game_id
) as gmg
on gm.game_id = gmg.game_id
left join (
select
  json_arrayagg(pf.platform) as platforms,
  gm.game_id
from game as gm
join game_platform as gp
on gm.game_id = gp.game_id
join  platform as pf
on gp.platform_id = pf.platform_id
group by gm.game_id
) as gmp
on gm.game_id = gmp.game_id
left join (
select
  json_arrayagg(im.src) as images,
  gm.game_id
from game as gm
join game_image as gi
on gm.game_id = gi.game_id
join image as im
on gi.image_id = im.image_id
group by gm.game_id
) as gmi
on gm.game_id = gmi.game_id`;

const GROUP = 'group by gm.game_id';

const SQL = {
  SELECT,
  GROUP,
} as const;

export default SQL;
