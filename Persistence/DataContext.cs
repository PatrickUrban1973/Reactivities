using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(c => c.HasKey(aa => new { aa.AppUserId, aa.ActivityId}));
            builder.Entity<ActivityAttendee>().HasOne(u => u.AppUser).WithMany(u => u.Activities).HasForeignKey(u => u.AppUserId);
            builder.Entity<ActivityAttendee>().HasOne(u => u.Activity).WithMany(u => u.Attendees).HasForeignKey(u => u.ActivityId);

            builder.Entity<Comment>().HasOne(a => a.Activity).WithMany(b => b.Comments).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });
                b.HasOne(b => b.Observer).WithMany(b => b.Followings).HasForeignKey(b => b.ObserverId).OnDelete(DeleteBehavior.Cascade);
                b.HasOne(b => b.Target).WithMany(b => b.Followers).HasForeignKey(b => b.TargetId).OnDelete(DeleteBehavior.NoAction);
            });
        }
    }
}