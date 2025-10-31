using Microsoft.EntityFrameworkCore;
using TaskManager.API.Models;

namespace TaskManager.API.Data
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options) { }
        
        // This represents our Tasks table in the database
        public DbSet<TaskItem> Tasks { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed some initial data for testing
            modelBuilder.Entity<TaskItem>().HasData(
                new TaskItem { 
                    Id = Guid.NewGuid(), 
                    Description = "Learn C#", 
                    IsCompleted = true 
                },
                new TaskItem { 
                    Id = Guid.NewGuid(), 
                    Description = "Build Task Manager API", 
                    IsCompleted = false 
                }
            );
        }
    }
}