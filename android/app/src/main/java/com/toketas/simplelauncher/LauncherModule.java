package com.toketas.simplelauncher;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.provider.Settings;

import java.util.ArrayList;
import java.util.List;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.module.annotations.ReactModule;

public class LauncherModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public LauncherModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;

    }

    private class AppDetail {
        String label;
        String packageName;

        public String toString() {
            return "{\"label\":\"" + this.label + "\",\"packageName\":\"" + this.packageName + "\"}";
        }
    }
    @Override
    public String getName() {
        return "LauncherModule";
    }


    @ReactMethod
    public void getApps(Promise promise) {
        try {
            List<AppDetail> l = new ArrayList<>();
            PackageManager pManager = this.reactContext.getPackageManager();

            Intent intent = new Intent(Intent.ACTION_MAIN, null);
            intent.addCategory(Intent.CATEGORY_LAUNCHER);

            List<ResolveInfo> allApps = pManager.queryIntentActivities(intent, 0);
            for (ResolveInfo ri: allApps) {
                AppDetail app = new AppDetail();
                app.packageName = ri.activityInfo.packageName.toString();
                app.label = ri.loadLabel(pManager).toString();
                l.add(app);
            }
            promise.resolve(l.toString());
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }

    @ReactMethod
    public void openSetDefaultLauncher(Promise promise) {
        try {
            Context context = getReactApplicationContext().getBaseContext();
            Intent intent = new Intent(Settings.ACTION_HOME_SETTINGS);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
            context.startActivity(intent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void openSettings() {
        Intent intent = new Intent(Settings.ACTION_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
    }

    @ReactMethod
    private void launchApplication(String packageName) {
        Intent launchIntent = this.reactContext.getPackageManager().getLaunchIntentForPackage(packageName);
        if (launchIntent != null) {
            this.reactContext.startActivity(launchIntent);
        }
    }
}