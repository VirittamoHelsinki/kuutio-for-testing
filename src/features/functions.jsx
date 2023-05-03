export const fullName = (email) => {
  if (!email) return;
  const _name = email.split("@")[0];
  const name = _name.replace(/[0-9]/g, "");
  const names = name.split(".");
  const firstname = names[0].charAt(0).toUpperCase() + names[0].slice(1);
  const lastname = names[names.length - 1].charAt(0).toUpperCase() + names[names.length - 1].slice(1);
  return firstname + " " + lastname;
};
