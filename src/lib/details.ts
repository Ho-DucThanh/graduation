export const invitationDetails = {
  title: "Graduation Invitation",
  studentName: "Welcome to the graduation ceremony!",
  university: "PHENIKAA University",
  date: "Thứ Bảy, 31/01/2026",
  time: "09:00 – 11:30",
  location: "PHENIKAA UNIVERSITY",
  address: "P. Nguyễn Trác, Yên Nghĩa, Hà Đông, Hà Nội",
  contactName: "Hồ Đức Thanh",
  contactPhone: "0395694928",
  khachmoi: "Vân Quỳnh",
};

export const guestList = [
  { name: "Vân Quỳnh", slug: "vanquynh" },
  { name: "Thảo Quỳnh", slug: "thaoquynh" },
  { name: "Phương Mai", slug: "phuongmai" },
  { name: "Thảo Vy", slug: "thaovy" },
  { name: "Hải Anh", slug: "haianh" },
  { name: "Hoa Mai", slug: "hoamai" },
  { name: "Minh Hiền", slug: "minhhien" },
  { name: "Anh Việt", slug: "anhviet" },
  { name: "Mọi người", slug: "moinguoi" },
  { name: "Phương Linh & Anh Công", slug: "phuonglinh" },
] as const;

function normalizeSlug(input: string): string {
  return input
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

export function getGuestNameFromSlug(slug: string | undefined | null): string {
  const normalized = slug ? normalizeSlug(slug) : "";
  if (!normalized) return invitationDetails.khachmoi;

  const match = guestList.find((g) => normalizeSlug(g.slug) === normalized);
  return match?.name ?? invitationDetails.khachmoi;
}

export function getGuestSlugFromName(name: string): string {
  const match = guestList.find((g) => g.name === name);
  return match?.slug ?? normalizeSlug(name);
}

export function getGuestNameFromPathname(
  pathname: string,
  baseUrl: string = "/",
): string {
  const base = baseUrl.replace(/\/$/, "");
  let relativePath = pathname;

  if (base && base !== "/" && relativePath.startsWith(base)) {
    relativePath = relativePath.slice(base.length);
  }

  const slug = relativePath.split("/").filter(Boolean)[0];
  return getGuestNameFromSlug(slug);
}

export const timelineItems = [
  {
    time: "07:30 – 09:30",
    title: "Lễ tốt nghiệp",
    description:
      "Nghi thức trao bằng & vinh danh, ghi dấu khoảnh khắc trưởng thành.",
  },
  {
    time: "09:30 – 11:30",
    title: "Chụp ảnh & Giao lưu",
    description:
      "Chụp ảnh lưu niệm cùng gia đình, bạn bè; chia sẻ lời chúc tốt đẹp.",
  },
  {
    time: "18:00 – 21:30",
    title: "Liên hoan tốt nghiệp",
    description:
      "Bữa tiệc tốt nghiệp cùng gia đình và bạn bè thân thiết tại nhà hàng.",
  },
] as const;
