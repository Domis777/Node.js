const SELECT = `
select
ur.user_id as id,
ur.email,
ur.name,
ur.surname,
ur.phone,
ur.password,
ur.role,
if(count(uri.user_id) = 0, json_array(), uri.images) as images
from user as ur
left join (
select
json_arrayagg(im.src) as images,
ur.user_id
from user as ur
join user_image as ui
on ur.user_id = ui.user_id
join image as im
on ui.image_id = im.image_id
group by ur.user_id
) as uri
on ur.user_id = uri.user_id
`;

const GROUPS = `
group by ur.user_id;
`;

const SQL = {
  SELECT,
  GROUPS,
};

export default SQL;
